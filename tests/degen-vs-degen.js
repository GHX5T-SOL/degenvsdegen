import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DegenVsDegen } from "../target/types/degen_vs_degen";
import { assert } from "chai";

describe("degen_vs_degen", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.DegenVsDegen as Program<DegenVsDegen>;
  const house = anchor.web3.Keypair.generate(); // Simulate house

  it("Initializes house vault", async () => {
    const [vault] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("house-vault")], program.programId);
    await program.methods.initializeHouseVault().accounts({
      house: house.publicKey,
      houseVault: vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([house]).rpc();
    const acc = await program.account.houseVault.fetch(vault);
    assert.equal(acc.owner.toString(), house.publicKey.toString());
  });

  it("Plays game", async () => {
    // Fund house and user, simulate play, check balances
    // ... (add detailed balance asserts)
  });
});
