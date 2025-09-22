use anchor_lang::prelude::*;

declare_id!("3CkSjNQAeoA4Zx5ZhQ7qrREFqw3xiyuFZF7mG97jQZNU");

#[program]
pub mod degen_vs_degen {
    use super::*;

    // Init house vault PDA, funded by house wallet off-chain
    pub fn initialize_house_vault(ctx: Context<InitializeHouseVault>) -> Result<()> {
        let vault = &mut ctx.accounts.house_vault;
        vault.owner = ctx.accounts.house.key();
        vault.bump = ctx.bumps.house_vault;
        Ok(())
    }

    // Play game: User bets, program matches from vault, flips, pays out
    pub fn play_game(ctx: Context<PlayGame>, bet: u64) -> Result<()> {
        let house_key = ctx.accounts.house.key();
        let user_acc = &mut ctx.accounts.user;
        let house_vault = &mut ctx.accounts.house_vault;
        let house_acc = &mut ctx.accounts.house;
        let escrow_acc = &mut ctx.accounts.escrow;

        // Check user has enough funds
        require_gte!(user_acc.lamports(), bet, ErrorCode::InsufficientFunds);

        // Check house vault has enough funds and correct owner
        require_keys_eq!(house_vault.owner, house_key, ErrorCode::InvalidOwner);
        require_gte!(house_acc.lamports(), bet, ErrorCode::HouseInsufficientFunds); // Need enough for matching

        // Transfer user bet to escrow
        user_acc.sub_lamports(bet)?;
        escrow_acc.add_lamports(bet)?;

        // Match from house vault
        house_acc.sub_lamports(bet)?;
        escrow_acc.add_lamports(bet)?;

        // Pseudo-random flip (use slot hash; 0 = heads/win, 1 = tails/lose)
        let clock = Clock::get()?;
        let slot_bytes = clock.slot.to_le_bytes();
        let hash = anchor_lang::solana_program::hash::hash(&slot_bytes);
        let outcome = hash.to_bytes()[0] % 2 == 0; // Win if even

        let total_pot = bet * 2; // User bet + house match
        if outcome {
            // Win: 3% fee to house, rest to user
            let fee = total_pot * 3 / 100;
            let winnings = total_pot - fee;

            // Transfer winnings to user
            escrow_acc.sub_lamports(total_pot)?;
            house_acc.add_lamports(fee)?;
            user_acc.add_lamports(winnings)?;
        } else {
            // Lose: All to house
            escrow_acc.sub_lamports(total_pot)?;
            house_acc.add_lamports(total_pot)?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeHouseVault<'info> {
    #[account(mut)]
    pub house: Signer<'info>,
    #[account(init, payer = house, space = 8 + 32 + 1, seeds = [b"house-vault"], bump)]
    pub house_vault: Account<'info, HouseVault>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct HouseVault {
    pub owner: Pubkey,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct PlayGame<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: This is the house wallet that will receive fees and match bets
    #[account(mut)]
    pub house: AccountInfo<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 8 + 1,
        seeds = [b"escrow", user.key().as_ref()],
        bump
    )]
    pub escrow: Account<'info, EscrowAccount>,
    #[account(seeds = [b"house-vault"], bump = house_vault.bump)]
    pub house_vault: Account<'info, HouseVault>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct EscrowAccount {
    pub user: Pubkey,
    pub bet: u64,
    pub bump: u8,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("House insufficient funds")]
    HouseInsufficientFunds,
    #[msg("Invalid owner")]
    InvalidOwner,
}
