const { web3 } = require("hardhat");
const { default: BigNumber } = require("bignumber.js");
const Oracle = artifacts.require("Oracle");

async function main()
{
	const accounts = await web3.eth.getAccounts();
	const deployer = accounts[0];
	const oracle4 = accounts[4];

	console.log("Deploying contracts with the account:", deployer);
	let balance = new BigNumber(await web3.eth.getBalance(deployer));
	console.log(
		"Account balance:",
		balance.div(1E18).toString()
	);

	const oracle = await Oracle.at("0x0C2814Bd9E0F3cb1Ae5259bd640666A4D81d726a");
	await oracle.addOracle(oracle4);
	console.log("Add off-chain oracle address:", oracle4);
}

main()
	.then(() => process.exit(0))
	.catch((error) =>
	{
		console.error(error);
		process.exit(1);
	});