// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable {
    uint256 public maxRequests = 500;

    uint256 public currentId = 0; //increasing request id
    uint256 public minQuorum = 1; //minimum number of responses to receive before declaring final result

    //Request[] public requests; //list of requests made to the contract
    // >=v0.7.0
    uint numRequests;
    mapping (uint => Request) requests;
    address[] public oracles;

    mapping(address => bool) public isOracle;
    mapping(string => mapping(string => string)) public currentResult;

    // defines a general api request
    struct Request {
        uint256 id; //request id
        string urlToQuery; //API url
        string attributeToFetch; //json attribute (key) to retrieve in the response
        string agreedValue; //value from key
        mapping(uint256 => string) anwers; //answers provided by the oracles
        mapping(address => bool) quorum; //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
    }

    //event that triggers oracle outside of the blockchain
    event NewRequest(uint256 id, string urlToQuery, string attributeToFetch);

    //triggered when there's a consensus on the final result
    event UpdatedRequest(
        uint256 id,
        string urlToQuery,
        string attributeToFetch,
        string agreedValue
    );

    function setMaxRequests(uint256 _maxRequests) external onlyOwner {
        require(_maxRequests > 0);
        maxRequests = _maxRequests;
    }

    function setMinQuorum(uint256 _minQuorum) external onlyOwner {
        require(_minQuorum > 0);
        minQuorum = _minQuorum;
    }

    function addOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0) && !isOracle[_oracle]);
        oracles.push(_oracle);
        isOracle[_oracle] = true;
    }

    function removeOracle(address _oracle) external onlyOwner {
        require(isOracle[_oracle]);
        for (uint256 i = 0; i < oracles.length; i++) {
            if (oracles[i] == _oracle) {
                delete oracles[i];
                break;
            }
        }
        isOracle[_oracle] = false;
    }

    function totalOracleCount() external view returns (uint256) {
        return oracles.length;
    }

    function getValue(
        string calldata _urlToQuery,
        string calldata _attributeToFetch
    ) external view returns (string memory) {
        return currentResult[_urlToQuery][_attributeToFetch];
    }


    function createRequest(
        string memory _urlToQuery,
        string memory _attributeToFetch
    ) public {
        Request storage r = requests[numRequests++];
        r.id = currentId;
        r.urlToQuery = _urlToQuery;
        r.attributeToFetch = _attributeToFetch;
        r.agreedValue = "";
        
        // oracles address
        for (uint256 i = 0; i < oracles.length; i++) {
            r.quorum[oracles[i]] = false;
        }

        // launch an event to be detected by oracle outside of blockchain
        emit NewRequest(currentId, _urlToQuery, _attributeToFetch);

        // increase request id
        currentId = (currentId + 1) % maxRequests;
    }

    //called by the oracle to record its answer
    function updateRequest(uint256 _id, string memory _valueRetrieved) public {
        Request storage currRequest = requests[_id];

        //check if oracle is in the list of trusted oracles
        //and if the oracle hasn't voted yet
        if (!currRequest.quorum[address(msg.sender)]) {
            //marking that this address has voted
            currRequest.quorum[msg.sender] = true;

            //iterate through "array" of answers until a position if free and save the retrieved value
            uint256 tmpI = 0;
            bool found = false;
            while (!found) {
                //find first empty slot
                if (bytes(currRequest.anwers[tmpI]).length == 0) {
                    found = true;
                    currRequest.anwers[tmpI] = _valueRetrieved;
                }
                tmpI++;
            }

            uint256 currentQuorum = 0;

            //iterate through oracle list and check if enough oracles(minimum quorum)
            //have voted the same answer has the current one
            for (uint256 i = 0; i < oracles.length; i++) {
                bytes memory a = bytes(currRequest.anwers[i]);
                bytes memory b = bytes(_valueRetrieved);

                if (keccak256(a) == keccak256(b)) {
                    currentQuorum++;
                    if (currentQuorum >= minQuorum) {
                        currRequest.agreedValue = _valueRetrieved;
                        currentResult[currRequest.urlToQuery][
                            currRequest.attributeToFetch
                        ] = _valueRetrieved;
                        emit UpdatedRequest(
                            currRequest.id,
                            currRequest.urlToQuery,
                            currRequest.attributeToFetch,
                            currRequest.agreedValue
                        );
                    }
                }
            }
        }
    }
}
