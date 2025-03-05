const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("MyToken", function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(1000); // Przykładowa ilość tokenów przy wdrożeniu
    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      expect(await token.tokenOwner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const totalSupply = await token.totalSupply();
      expect(await token.balanceOf(owner.address)).to.equal(totalSupply);
    });
  });

  describe("Transfers", function () {
    it("Should allow the owner to transfer tokens", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await token.transfer(otherAccount.address, 100);
      expect(await token.balanceOf(owner.address)).to.equal(900);
      expect(await token.balanceOf(otherAccount.address)).to.equal(100);
    });

    it("Should fail when the sender does not have enough tokens", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await expect(token.connect(otherAccount).transfer(owner.address, 100))
        .to.be.revertedWith("Not enough money");
    });

    it("Should emit a Transfer event", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await expect(token.transfer(otherAccount.address, 100))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, otherAccount.address, 100);
    });
  });

  describe("Allowance and Approvals", function () {
    it("Should allow an approval and check allowance", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await token.approve(otherAccount.address, 50);
      expect(await token.allowance(owner.address, otherAccount.address)).to.equal(50);
    });

    it("Should allow transferring from an approved address", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await token.approve(otherAccount.address, 100);
      await token.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 50);
      expect(await token.balanceOf(owner.address)).to.equal(950);
      expect(await token.balanceOf(otherAccount.address)).to.equal(150);
    });

    it("Should fail if allowance is exceeded", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployTokenFixture);
      await token.approve(otherAccount.address, 50);
      await expect(token.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 100))
        .to.be.revertedWith("Allowance exceeded");
    });
  });

  describe("Burning Tokens", function () {
    it("Should allow burning tokens", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const initialSupply = await token.totalSupply();
      await token.burn(100);
      const finalSupply = await token.totalSupply();
      expect(finalSupply).to.equal(initialSupply - 100);
    });

    it("Should fail if burning more than available balance", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      await expect(token.burn(1000))
        .to.be.revertedWith("Not enough balance to burn");
    });
  });
});
