const { web3 } = require("hardhat");
const { default: BigNumber } = require("bignumber.js");
const Oracle = artifacts.require("Oracle");

async function main() {
    const oracle = await Oracle.at("0xD0d19820C0B8f7Daa9c033222cB19B3E3883D569");
    const value = await oracle.getValue("https://api.coingecko.com/api/v3/simple/price?ids=warden&vs_currencies=usd", "warden.usd");
    console.log(value);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });