pragma solidity 0.7.0;

contract ChangeBalance {
    uint8 public balance;

    function decrease() public {
        balance--;
    }

    function increase() public {
        balance++;
    }

    function getBalance() public view returns (uint8) {
        return balance;
    }
}