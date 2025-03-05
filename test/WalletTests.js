const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("MyWallet", function () {
  async function deployWalletFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MyWallet = await ethers.getContractFactory("MyWallet");
    const wallet = await MyWallet.deploy();
    return { wallet, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      expect(await wallet.owner()).to.equal(owner.address);
    });
  });

  describe("Deposits", function () {
    it("Should accept ETH deposits", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      const tx = await owner.sendTransaction({ 
        to: wallet.address, 
        value: ethers.parseEther("1") 
      });
      await tx.wait();
      expect(await ethers.provider.getBalance(wallet.address)).to.equal(ethers.parseEther("1"));
    });

    it("Should emit a Deposited event", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      await expect(owner.sendTransaction({ 
        to: wallet.address, 
        value: ethers.parseEther("1") 
      }))
      .to.emit(wallet, "Deposited")
      .withArgs(owner.address, ethers.parseEther("1"));
    });
  });

  describe("Withdrawals", function () {
    it("Should allow owner to withdraw ETH", async function () {
      const { wallet, owner, otherAccount } = await loadFixture(deployWalletFixture);
      await owner.sendTransaction({ to: wallet.address, value: ethers.parseEther("2") });
      const initialBalance = await owner.getBalance();
      const tx = await wallet.connect(owner).withdraw(ethers.parseEther("1"));
      await tx.wait();
      const finalBalance = await owner.getBalance();
      expect(finalBalance).to.be.above(initialBalance);
      expect(await ethers.provider.getBalance(wallet.address)).to.equal(ethers.parseEther("1"));
    });

    it("Should revert when non-owner tries to withdraw", async function () {
      const { wallet, otherAccount } = await loadFixture(deployWalletFixture);
      await expect(wallet.connect(otherAccount).withdraw(ethers.parseEther("1")))
        .to.be.revertedWith("Not the owner");
    });

    it("Should revert if there are insufficient funds", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      await expect(wallet.connect(owner).withdraw(ethers.parseEther("1")))
        .to.be.revertedWith("Insufficient funds");
    });
  });

  describe("Get Balance", function () {
    it("Should return the correct balance", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      await owner.sendTransaction({ to: wallet.address, value: ethers.parseEther("2") });
      const balance = await wallet.getBalance();
      expect(balance).to.equal(ethers.parseEther("2"));
    });
  });
});
