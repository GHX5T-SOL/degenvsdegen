#!/usr/bin/env node

const anchor = require('@coral-xyz/anchor');
const { PublicKey, Keypair, SystemProgram } = require('@solana/web3.js');
const fs = require('fs');

// Configuration
const PROGRAM_ID = new PublicKey('3CkSjNQAeoA4Zx5ZhQ7qrREFqw3xiyuFZF7mG97jQZNU');
const HOUSE_WALLET = new PublicKey('7Po3gCenxonM4W6WfDEqMonhQQP59kBr5uZV6BUZLxaf');
const RPC_URL = 'https://api.devnet.solana.com';

async function initializeHouseVault() {
  try {
    console.log('🚀 Initializing house vault...');
    
    // Create connection
    const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');
    
    // Create provider (you'll need to set up the house wallet keypair)
    const houseKeypair = Keypair.generate(); // In production, load from .env
    const provider = new anchor.AnchorProvider(
      connection,
      { publicKey: houseKeypair.publicKey, signTransaction: async (tx) => tx, signAllTransactions: async (txs) => txs },
      { commitment: 'confirmed' }
    );

    // Load the program
    const idl = {
      version: "0.1.0",
      name: "degen_vs_degen",
      instructions: [
        {
          name: "initialize_house_vault",
          accounts: [
            { name: "house", isMut: true, isSigner: true },
            { name: "house_vault", isMut: true, isSigner: false },
            { name: "system_program", isMut: false, isSigner: false }
          ]
        }
      ]
    };

    const program = new anchor.Program(idl, PROGRAM_ID, provider);

    // Find house vault PDA
    const [houseVault] = await PublicKey.findProgramAddress(
      [Buffer.from('house-vault')],
      PROGRAM_ID
    );

    console.log('📋 House Vault PDA:', houseVault.toString());
    console.log('🏠 House Wallet:', HOUSE_WALLET.toString());

    // Note: In production, you would need to:
    // 1. Load the actual house wallet keypair from .env
    // 2. Fund the house wallet with SOL
    // 3. Call the initialize_house_vault instruction
    
    console.log('✅ House vault initialization script ready!');
    console.log('📝 Next steps:');
    console.log('   1. Fund the house wallet with SOL');
    console.log('   2. Run the initialize_house_vault instruction');
    console.log('   3. The coinflip game will be ready to use!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the initialization
initializeHouseVault();
