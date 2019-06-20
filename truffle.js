require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "";
var mnemonic = "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: '*',
      gas: 6300000,
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey)
      },
      gas: 6300000,
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infura_apikey)
      },
      gas: 6300000,
      network_id: 4
    },
    live: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + infura_apikey)
      },
      gas: 6300000,
      network_id: 1
    },
  },
  compilers: {
    solc: {
      version: "0.4.24",  // ex:  "0.4.20". (Default: Truffle's installed solc)
      optimizer: {
      enabled: true,
      runs: 200
     }
   }
 }
};
