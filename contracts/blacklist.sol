// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlackList is Ownable {
    mapping(address => bool) blacklisted;
    
    event Blacklisted(address __user, bool);

    function _isPermitted(address uesr) public view returns(bool) {
        return !blacklisted[uesr];
    
    }
    
    function AddRemoveBlacklist(address _user) public onlyOwner{

        if (!blacklisted[_user]) {
            blacklisted[_user] = true;
            emit Blacklisted(_user, true);
        } else {
            blacklisted[_user] = false;

            emit Blacklisted(_user, false);
        }
    }
}
