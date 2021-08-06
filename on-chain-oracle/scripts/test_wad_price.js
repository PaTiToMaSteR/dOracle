const { web3 } = require("hardhat");
const { default: BigNumber } = require("bignumber.js");
const Oracle = artifacts.require("Oracle");

async function main()
{
	const oracle = await Oracle.at("0x0C2814Bd9E0F3cb1Ae5259bd640666A4D81d726a");
	const value = await oracle.getValue("https://api.coingecko.com/api/v3/simple/price?ids=warden&vs_currencies=usd", "warden.usd");
	console.log(value);
}

main()
	.then(() => process.exit(0))
	.catch((error) =>
	{
		console.error(error);
		process.exit(1);
	});