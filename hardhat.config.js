const path = require('path');
const fs = require("fs");
const env_path = path.join(__dirname, '.', '.env');
require('dotenv').config({
  path: fs.existsSync(env_path) ? env_path : path.join(__dirname, '.', '.local.env')
});

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const privateKeys = [
  process.env.ADMIN_KEY,
  ...(process.env.ACCOUNTS === undefined ? []:process.env.ACCOUNTS.split(","))
].filter(a => !!a);

// default path (i.e.  `m/44'/60'/0'/0/0`
const mnemonic = process.env.MNEMONIC;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  mocha: {
    timeout: false
  },
  solidity: {
    compilers: [{
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }]
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    admin: 0
  },
  networks: {
    hardhat: {
      saveDeployments: true,
      accounts: mnemonic !== undefined ?
        { mnemonic: mnemonic }
        : privateKeys.map((privateKey) => {
          return {privateKey: privateKey, balance: "1000000000000000000000000"}
        }),
      allowUnlimitedContractSize: true
    },
    binance: {
      url: "https://bsc-dataseed.binance.org",
      accounts: privateKeys,
      chainId: 56,
      gasPrice: "auto",
      blockGasLimit: 79196578,
      allowUnlimitedContractSize: true
    }
  },
  paths: {
    sources: "contracts",
    tests: "tests",
    cache: "cache",
    artifacts: "artifacts",
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports'
  }
}
