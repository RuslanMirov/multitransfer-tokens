pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol";

contract Sender is Ownable {
  BasicToken token;

  function setToken(BasicToken _token) onlyOwner() public{
    token = _token;
  }

  function distribute(address[] recivers, uint256[] values) onlyOwner() public {
    for (uint i = 0; i < recivers.length; i ++){
      token.transfer(recivers[i], values[i]);
    }
  }

  function getBackTokens(uint256 amount) onlyOwner() public{
    token.transfer(owner, amount);
  }
}
