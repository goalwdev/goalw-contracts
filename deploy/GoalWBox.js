const { toBN } = require("../scripts/utils");

module.exports = async (hre) => {
  const accounts = await hre.getNamedAccounts();
  const deployer = accounts.admin;

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());

  const {address} = await hre.deployments.deploy("GoalWBox", {
    from: deployer,
    args: [
      (await hre.ethers.getContract("GoalW")).address, // goalw
      "0xe9e7cea3dedca5984780bafc599bd69add087d56", // busd
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", // wbnb
      "0xca143ce32fe78f1f7019d7d551a6402fc5350c73", // swap factory
      24*60*60/3,
    ],
    log: true,
  });

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());
};

module.exports.tags = ['GoalWBox'];

module.exports.dependencies = ["GoalW"];