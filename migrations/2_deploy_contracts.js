const Token = artifacts.require("./Token.sol");
const Sender = artifacts.require("./Sender.sol");

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}

module.exports = function(deployer) {
  //Token
  const name = "Token";
  const symbol = "TKN";
  const decimals = 18;
  const totalSupply = ether(2000000000);

  deployer.deploy(Token, name, symbol, decimals, totalSupply)
    .then(() => {
      return deployer.deploy(Sender);
    });
};
