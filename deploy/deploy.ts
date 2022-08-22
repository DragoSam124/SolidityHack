import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Hardhat task defining the contract deployments
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  const chainId = await hre.getChainId();
  let deployer;
  ({ deployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log({ chainId, deployer });

  let changeBalanceTokenAddress: string;
  let depositFundsTokenAddress: string;
  // Deploy distribution contract
  console.log(`Deploying distribution contract to chain:${chainId}`);
  await hre.deployments.deploy("ChangeBalance", {
    from: deployer,
    log: true,
  });

  changeBalanceTokenAddress = (await hre.deployments.get("ChangeBalance")).address;
  
  await hre.deployments.deploy("Attack", {
    from: deployer,
    log: true,
    args: [
      changeBalanceTokenAddress
    ]
  });

  await hre.deployments.deploy("DepositFunds", {
    from: deployer,
    log: true,
  });

  depositFundsTokenAddress = (await hre.deployments.get("DepositFunds")).address;

  await hre.deployments.deploy("AttackDeposit", {
    from: deployer,
    log: true,
    args: [
      depositFundsTokenAddress
    ]
  });

};

export default func;
