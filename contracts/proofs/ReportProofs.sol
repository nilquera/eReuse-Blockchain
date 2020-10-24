pragma solidity ^0.4.25;

contract ReportProofs {
    uint256 public id;
    // mapping(uint256 => bytes32) private reportProofs;
    event reportProofCreated(uint256 indexed id, bytes32 hash);

    constructor() public {id = 0;}

    function setProof(bytes32 hash) public{
        // reportProofs[id] = hash;
        emit reportProofCreated(id, hash);
        ++id;
    } 
}