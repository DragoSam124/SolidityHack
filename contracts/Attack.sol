pragma solidity 0.8.0;

import 'hardhat/console.sol';
import './ChangeBalance.sol';

contract Attack {
    ChangeBalance public changeBalance;

    constructor(address _changeBalanceAddress) {
        changeBalance = ChangeBalance(_changeBalanceAddress);
    }

    function attack() public {
        console.log(changeBalance.getBalance());
        changeBalance.decrease();
        console.log(changeBalance.getBalance());
    }
}