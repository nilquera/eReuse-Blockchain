/**
 * Auxiliary function to create an instance of some smart contract
 * whose address is known.
 * @param {Function} contractInstance Instance of DeviceFactory smart contract.
 * @param {string} ownerAddress String representation of the Ethereum
 *                                 address of the owner.
 * @returns {Promise} A promise which resolves to the the devices owned by user.
 */
export function getProofsFromDevice(contractInstance, proofType: ProofType) {
    return contractInstance.getProofs(proofType);
}

/**
 * Returns the information of some proof given its hash and type.
 * 
 * @param contractInstance instance of ProofsHandler smart contract.
 * @param proofHash hash identifying the given proof.
 * @param proofType type of the proof to be explored.
 */
export function getProofInformation(contractInstance, proof: ProofID): ProofAttributeObject {
    switch (proof.type) {
        case 'ProofDataWipe':
            return contractInstance.getDataWipeProofData(proof.hash);
        case 'ProofTransfer':
            return contractInstance.getTransferProofData(proof.hash);
        case 'ProofFunction':
            return contractInstance.getFunctionProofData(proof.hash);
        case 'ProofReuse':
            return contractInstance.getReuseProofData(proof.hash);
        case 'ProofRecycling':
            return contractInstance.getRecycleProofData(proof.hash);
        default:
            break;
    }
}

// export function getProofKeys(proofType: ProofType): ProofAttribute[] {
//     switch (proofType) {
//         case proofTypes.dataWipe:
//             return ['erasureType', 'date', 'erasureResult', 'proofAuthor'];
//         case proofTypes.transfer:
//             return ['supplier', 'receiver', 'deposit', 'isWaste'];
//         case proofTypes.function:
//             return ['score', 'diskUsage', 'algorithmVersion', 'proofAuthor'];
//         case proofTypes.reuse:
//             return ['receiverSegment', 'idReceipt', 'price'];
//         case proofTypes.recycle:
//             return ['collectionPoint', 'date', 'contact', 'ticket',
//                 'gpsLocation', 'recyclerCode'];
//         default:
//             break;
//     }
// }

export type ProofID = {
    hash: string,
    type: ProofType
}


export type ProofType = 'ProofDataWipe' | 'ProofTransfer' | 'ProofFunction' | 'ProofReuse' | 'ProofRecycling'

export type ProofAttribute = 'erasureType' | 'date' | 'erasureResult' | 'proofAuthor' | 
    'supplier' | 'receiver' | 'deposit' | 'isWaste' |
    'score' | 'diskUsage' | 'algorithmVersion' |
    'receiverSegment' | 'idReceipt' | 'price' | 
    'collectionPoint' | 'contact' | 'ticket' | 'gpsLocation' | 'recyclerCode'
export type ProofAttributeObject = {[k in ProofAttribute]: any}

export const proofTypes = ['ProofDataWipe', 'ProofTransfer', 'ProofFunction', 'ProofReuse', 'ProofRecycling']

export const proofTypeAttributes = {
    'ProofDataWipe': ['erasureType', 'date', 'erasureResult', 'proofAuthor'],
    'ProofTransfer': ['supplier', 'receiver', 'deposit', 'isWaste'],
    'ProofFunction': ['score', 'diskUsage', 'algorithmVersion', 'proofAuthor'],
    'ProofReuse': ['receiverSegment', 'idReceipt', 'price'],
    'ProofRecycling': ['collectionPoint', 'date', 'contact', 'ticket',
        'gpsLocation', 'recyclerCode']
}


// export type ProofDataWipe = {
//     'erasureType': string
//     'date': string
//     'erasureResult': string
//     'proofAuthor': string
// }

// export type ProofTran

// export const proofTypes = {
//     dataWipe: 'ProofDataWipe',
//     transfer: 'ProofTransfer',
//     function: 'ProofFunction',
//     reuse: 'ProofReuse',
//     recycle: 'ProofRecycling',
// }

