const { web3 } = require("hardhat");
const { default: BigNumber } = require("bignumber.js");
const Oracle = artifacts.require("Oracle");

async function main() {
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    const oracle4 = accounts[4];

    console.log("Deploying contracts with the account:", deployer);
    let balance = new BigNumber(await web3.eth.getBalance(deployer));
    console.log(
        "Account balance:",
        balance.div(1E18).toString()
    );

    const oracle = await Oracle.at("0xD0d19820C0B8f7Daa9c033222cB19B3E3883D569");
    await oracle.addOracle(oracle4);
    console.log("Add off-chain oracle address:", oracle4);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });