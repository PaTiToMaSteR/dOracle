# dOracle
Ethereum based oracle

### Installing

After cloning this repository and installing the above dependencies, perform with $

1. Use the proper node version, if you don't have lts/dubnium install it
```
nvm alias default lts/dubnium
nvm use default
```

2. Install truffle and ganche globally in your system:
```
npm uninstall -g truffle
npm install -g truffle  
truffle -version  
npm install -g ganache-cli
ganache-cli --version	
```
Output:
Truffle v5.4.3 - a development framework for Ethereum
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

3. Execute ganche
ganache-cli -a 3 -d -m "stomach wage stem judge control beauty glue chapter cannon kitchen pilot orbit"

4. Compile the local version in a new terminal which will deploy the contract onto your local ethereum blockchain. 
if you deploy to the testnet do truffle migrate --network ropsten, see truffle.js
```
nvm use default
cd on-chain-oracle
yarn install
truffle compile
truffle migrate
```

5. Compile the off-chain code in a new terminal
```
nvm use default
cd ./off-chain-oracle
yarn install
```
6. Configure the .env
RPC_URL=https://ropsten.infura.io/v3/4ef4ffec11664228a7589dd79511eb04	// Your infura project, to track requests
CHAIN_ID=3	// 3 means ropsten testnet

CONTRACT_ADDRESS=0xea530407DBfaC81DDdCecAde863DD1D290f06Dac	// After you deploy the contract with truffle migrate you copy that address here
ABI=[{...}]	// in one line copy paste the ABI key of the Oracle.json in 1 line, I used: https://tools.knowledgewalls.com/online-multiline-to-single-line-converter

TIMEOUT=10000	// to not bombard the logs and see something...

MNEMONIC=trend garlic surround program impulse text address arctic account other faculty total	// This is the seed phrase of your METAMASK account done in ropsten
ACCOUNT_NUMBER=0	// You can run multiple oracles but with 1 it's ok here

URL_TO_QUERY=https://api.coingecko.com/api/v3/simple/price?ids=dopple-finance&vs_currencies=usd		// url you want to gather a JSON
ATTRIBUTE_TO_FETCH=dopple-finance.usd																// which key.value you want to get


7. Run the off-chain test
``` 
yarn run develop
```