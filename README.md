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
yarn run develop
```