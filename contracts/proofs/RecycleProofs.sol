pragma solidity ^0.4.25;
import "contracts/proofs/GenericProof.sol";

contract RecycleProofs is GenericProof {
    struct ProofData {
        string collectionPoint;
        string date;
        string contact;
    }
    mapping(uint256 => ProofData) dataProofs;

    constructor() public GenericProof() {}

    function getProofData(uint256 _hash)
        public
        view
        returns (string _collectionPoint, string _date, string _contact)
    {
        return (
            dataProofs[_hash].collectionPoint,
            dataProofs[_hash].date,
            dataProofs[_hash].contact
        );
    }

    function setProofData(
        address device_addr,
        address owner,
        string collectionPoint,
        string date,
        string contact
    ) public returns (uint256 _hash_) {
        uint256 _hash = generateHash();
        setProof(_hash, device_addr, owner);
        dataProofs[_hash] = ProofData(collectionPoint, date, contact);
        return _hash;
    }

}
