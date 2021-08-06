/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const mnemonic = process.env.MNEMONIC;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () =>
{
	const accounts = await ethers.getSigners();

	for (const account of accounts)
	{
		console.log(account.address);
	}
});

module.exports = {
	defaultNetwork: "localhost",
	solidity: "0.6.6",
	networks: {
		xchain: {
			url: "https://rpc.xchain.asia",
			chainId: 3,
			accounts: { mnemonic: mnemonic }
		}
	},
	settings: {
		optimizer: {
			enabled: true,
			runs: 200,
		},
	}
};
