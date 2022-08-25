const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Dop distribution", function() {
  it("Should return the new greeting once it's changed", async function() {
    console.log("Start testcase........");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    
    const changeBalanceContract = await ethers.getContractFactory("ChangeBalance");
    const changeBalanceCreater = await changeBalanceContract.deploy();

    console.log("This is changebalance contract:", changeBalanceCreater.address);

    console.log("<---- ChangeBalance Contract, First Balance Value: 0 --->");
    changeBalanceCreater.decrease();
    console.log("After Decrease:", await changeBalanceCreater.getBalance());
    changeBalanceCreater.increase();
    console.log("After Increase:", await changeBalanceCreater.getBalance());

    const attackContract = await ethers.getContractFactory("Attack");
    const attactCreater = await attackContract.deploy(changeBalanceCreater.address);

    console.log("This is attack contract:", attactCreater.address);

    console.log("<--- Attack Contract, First Balance Value: 0 --->")

    await attactCreater.attack();

    const depositFundsContract = await ethers.getContractFactory("DepositFunds");
    const depositFundsCreater = await depositFundsContract.deploy();

    console.log("This is depositfunds:", depositFundsCreater.address);

    const attackDepositContract = await ethers.getContractFactory("AttackDeposit");
    const attackDepositCreater = await attackDepositContract.deploy(depositFundsCreater.address);

    console.log("This is attackdeposit:", attackDepositCreater.address);
  });
});