pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Sender is Ownable {
  ERC20 token;
  event Sended(address indexed user, uint256 amount);

  constructor(ERC20 _token) public {
   token = _token;
  }

  function changeToken(ERC20 _token) onlyOwner() public{
   token = _token;
  }

  function distribute(address[] recivers, uint256[] values) onlyOwner() public {
    for (uint i = 0; i < recivers.length; i ++){
      token.transfer(recivers[i], values[i]);
      emit Sended(recivers[i], values[i]);
    }
  }

  function fixAmountDistribute(address[] recivers, uint256 value) onlyOwner() public {
    for (uint i = 0; i < recivers.length; i ++){
      token.transfer(recivers[i], value);
      emit Sended(recivers[i], value);
    }
  }

  function getBackTokens(uint256 amount) onlyOwner() public{
    token.transfer(owner, amount);
  }
}
