import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect} from "chai";
import hre from "hardhat";

describe("SecuredStringVault tests", function () {

  async function deployVaultFixture() {
    const Vault = await hre.ethers.getContractFactory("SecuredStringVault");
    const vault = await Vault.deploy();
    return {vault};
  }

  describe("Save public key", function () {
    it("User should be able to store its schnorr public key", async function () {
      const {vault} = await loadFixture(deployVaultFixture);
      const [user] = await hre.ethers.getSigners();
      const publicKey = "0x035906625a56006af1e0908778ae3e313fea9bcee85531a91751575d5842f10bb6";
      await vault.savePublicKey(publicKey);
      expect(await vault.publicKeys(user.address)).to.equal(publicKey);
    });
  });

  //skkiped due to custom precompile is not available in the hardhat network
  describe.skip("Strings", function () {
    it("User should be able to store strings", async function () {
      const {vault} = await loadFixture(deployVaultFixture);
      const [user] = await hre.ethers.getSigners();
      const publicKey = "0x035906625a56006af1e0908778ae3e313fea9bcee85531a91751575d5842f10bb6";
      await vault.savePublicKey(publicKey);

      const signature = "0x6fc48f0583170fa3a494518b3126847cdbe9b77c65722a6e8ab22853c4949fb5d9e2849725ed62beca748681607d6b00f91bfcc29cac29a20fc08d8794a41ced";
      const strings = ["test", "message"];
      await vault.saveStrings(strings, signature);
      expect(await vault.userStrings(user.address, 0)).to.equal(strings[0]);
      expect(await vault.userStrings(user.address, 1)).to.equal(strings[1]);
    });
  });



});
