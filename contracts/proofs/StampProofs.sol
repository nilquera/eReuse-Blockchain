pragma solidity ^0.4.25;

contract StampProofs {
    // mapping(uint256 => bytes32) private stampProofs;
    event stampProof(uint256 indexed id, bytes32 indexed hash, uint256 timestamp);

    constructor() public {}

    function setProof(uint256 id, bytes32 hash) public{
        // stampProofs[id] = hash;
        emit stampProof(id, hash, block.timestamp);
    } 
}