require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		development: {
			network_id: '*',
			host: 'localhost',
			port: process.env.PORT
		},
		ropsten: {
			provider: function ()
			{
				return new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS);
			},
			network_id: '3',
		},
	},
	compilers: {
		solc: {
			version: "^0.6.6",

			optimizer: {
				enabled: true,
				runs: 500
			}
		}
	}
};