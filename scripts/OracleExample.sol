// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/PaTiToMaSteR/dOracle/main/on-chain-oracle/contracts/Oracle.sol";
import "./Store.sol";

contract OracleExample is Oracle, Store {
    string public EURUSD;
    Store public store;

    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);
    event LogCallBackId(bytes32 id);

    event LogCallBack_getPrice(uint256 price);
    event LogCallBack_setPrice(string symbol, uint256 price);

    constructor() {
        emit LogConstructorInitiated(
            "Constructor was initiated. Call 'updatePrice()' to send the Provable Query."
        );
    }

    function updatePrice() public payable {
        emit LogNewProvableQuery("Here we go...");
        createRequest(
            "https://api.coingecko.com/api/v3/simple/price?ids=dopple-finance&vs_currencies=usd",
            "dopple-finance.usd"
        );
    }

    function __callback(bytes32 myid, string memory result) public payable {
        emit LogCallBackId(myid);
        emit LogPriceUpdated(result);
        //require(msg.sender == 0x0C2814Bd9E0F3cb1Ae5259bd640666A4D81d726a);
        EURUSD = result;
        emit LogPriceUpdated(EURUSD);
    }
}
