// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Store is Ownable {
    //prices mapped by SYMBOL => price in USD
    mapping(string => uint256) price;

    //only the owner can set prices by symbol
    function setPrice(string memory _symbol, uint256 _price) public onlyOwner {
        //setPrice should never get called once a descendant is set
        price[_symbol] = _price;
    }

    //anyone can get any price by symbol
    function getPrice(string memory _symbol) public view returns (uint256) {
        return price[_symbol];
    }
}
