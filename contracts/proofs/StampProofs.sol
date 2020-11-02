pragma solidity ^0.4.25;

contract StampProofs {
    // mapping(uint256 => bytes32) private stampProofs;
    event stampProof(bytes32 indexed hash, uint256 timestamp);

    constructor() public {}

    function setProof(bytes32 hash) public{
        // stampProofs[id] = hash;
        emit stampProof(hash, block.timestamp);
    } 
}