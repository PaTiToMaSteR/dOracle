const { web3 } = require("hardhat");
const { default: BigNumber } = require("bignumber.js");
const Oracle = artifacts.require("Oracle");

async function main() {
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    const oracle1 = accounts[1];
    const oracle2 = accounts[2];
    const oracle3 = accounts[3];
    console.log("Deploying contracts with the account:", deployer);
    let balance = new BigNumber(await web3.eth.getBalance(deployer));
    console.log(
        "Account balance:",
        balance.div(1E18).toString()
    );    
    const oracle = await Oracle.new();
    console.log("Oracle address: ", oracle.address);
    
    await oracle.addOracle(deployer);
    console.log("Add off-chain oracle address:", deployer);

    await oracle.addOracle(oracle1);
    console.log("Add off-chain oracle address:", oracle1);

    await oracle.addOracle(oracle2);
    console.log("Add off-chain oracle address:", oracle2);

    await oracle.addOracle(oracle3);
    console.log("Add off-chain oracle address:", oracle3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });