# Test

1) npm install
2) truffle test

# Deploy
1) set infura_apikey and mnemonic
2) npm install
3) truffle migrate --network (your network)

# Use
0) transfer some tokens to Sender contract address
1) Set Your token address via setToken()
2) Pass two list with address and value in distribute() like this: distribute([address1, address2, address3], ["500000000000000000", "1000000000000000000", "2000000000000000000"]) big number (token value in hex) should wrap it in double quotes


# Additional 
1) Owner can get back tokens via getBackTokens()
