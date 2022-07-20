const { toBN } = require("../scripts/utils");

module.exports = async (hre) => {
  const accounts = await hre.getNamedAccounts();
  const deployer = accounts.admin;

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());
  const {address} = await hre.deployments.deploy("GoalW", {
    from: deployer,
    log: true,
  });
  console.log((await hre.ethers.provider.getBalance(deployer)).toString());
};

module.exports.tags = ['GoalW'];

module.exports.dependencies = ["Swap"];