const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyWalletModule", (m) => {
    const myWallet = m.contract("contracts/MyWallet.sol:MyWallet", []);
  return { myWallet };
});
