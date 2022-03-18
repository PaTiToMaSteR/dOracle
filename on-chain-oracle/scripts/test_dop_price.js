require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });
const Oracle = artifacts.require("Oracle");

async function main()
{
    const oracle = await Oracle.at("0x39391fE8c29b95E134ebEA1467Dee5EAba742257");
	const value = await oracle.getValue("https://api.coingecko.com/api/v3/simple/price?ids=dopple-finance&vs_currencies=usd", "dopple-finance.usd");
	console.log(value);
}

main()
	.then(() => process.exit(0))
	.catch((error) =>
	{
		console.error(error);
		process.exit(1);
	});