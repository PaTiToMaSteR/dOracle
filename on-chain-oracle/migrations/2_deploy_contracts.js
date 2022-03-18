require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });
const Oracle1 = artifacts.require("../contracts/Oracle.sol");
const Oracle2 = artifacts.require("../contracts/Oracle.sol");
const Oracle3 = artifacts.require("../contracts/Oracle.sol");

module.exports = async function (deployer, network, accounts)
{
    await deployer.deploy(Oracle1, { from: accounts[0] });
    await deployer.deploy(Oracle2, { from: accounts[1] });
    await deployer.deploy(Oracle3, { from: accounts[2] });
    const instance1 = await Oracle1.deployed();
    const instance2 = await Oracle2.deployed();
    const instance3 = await Oracle3.deployed();

    console.log(`Oracle1 address: ${instance1.address}`);
    console.log(`Oracle2 address: ${instance2.address}`);
    console.log(`Oracle3 address: ${instance3.address}`);

    await instance1.addOracle(Oracle2.address);
    await instance1.addOracle(Oracle3.address);

    if (network === 'local')
    {
    }
    else if (network === 'testnet')
    {
    }
    const oracle = await Oracle1.at(instance1.address);
    const value = await oracle.getValue("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT", "price");
    
    console.log(`Oracle says: ${value}`);
};