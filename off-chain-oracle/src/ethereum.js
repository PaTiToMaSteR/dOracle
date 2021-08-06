require("dotenv").config();

import Web3 from "web3";
const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL, 0, 9);
const web3 = new Web3(provider);
const abi = JSON.parse(process.env.ABI);
const address = process.env.CONTRACT_ADDRESS;
const contract = web3.eth.contract(abi).at(address);
const chainId = process.env.CHAIN_ID;

const account = () =>
{
	return new Promise((resolve, reject) =>
	{
		web3.eth.getAccounts((err, accounts) =>
		{
			if (err === null)
			{
				resolve(accounts[process.env.ACCOUNT_NUMBER]);
			} else
			{
				reject(err);
			}
		});
	});
};

export const createRequest = ({
	urlToQuery,
	attributeToFetch
}) =>
{
	return new Promise((resolve, reject) =>
	{
		account().then(account =>
		{
			contract.createRequest(urlToQuery, attributeToFetch, {
				from: account,
				gas: '0x30d40', // 200,000 wei
				chainId: chainId
			}, (err, res) =>
			{
				if (err === null)
				{
					console.log("createRequest::result - resolving...", res);
					resolve(res);
				} else
				{
					reject(err);
				}
			});
		}).catch(error => reject(error));
	});
};

export const updateRequest = ({
	id,
	valueRetrieved
}) =>
{
	return new Promise((resolve, reject) =>
	{
		account().then(account =>
		{
			contract.updateRequest(id, valueRetrieved, {
				from: account,
				gas: '0x30d40', // 200,000 wei
				chainId: chainId
			}, (err, res) =>
			{
				if (err === null)
				{
					console.log("updateRequest::result - resolving...", res);
					resolve(res);
				} else
				{
					reject(err);
				}
			});
		}).catch(error => reject(error));
	});
};

export const newRequest = (callback) =>
{
	contract.NewRequest((error, result) => callback(error, result));
};

export const updatedRequest = (callback) =>
{
	contract.UpdatedRequest((error, result) => callback(error, result));
};