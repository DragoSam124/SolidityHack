import { HardhatUserConfig } from "hardhat/types";
import { config as dotEnvConfig } from "dotenv";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";

dotEnvConfig();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: { default: 0 },
    alice: { default: 1 },
    bob: { default: 2 },
    rando: { default: 3 },
  },
  networks: {
    rinkeby: {
      url: process.env.RPC_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
