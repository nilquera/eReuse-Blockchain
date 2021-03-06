const DeviceFactory = artifacts.require('DeviceFactory');
const DepositDevice = artifacts.require('DepositDevice');
const ProofsHandler = artifacts.require('ProofsHandler');
const assert = require('assert');
const web3 = require('../ganache-web3');

const minimist = require('minimist'),
    argv = minimist(process.argv.slice(2), {
        string: ['network']
    });
const network = argv.network;

contract("Test for generic proof data", function (accounts) {
    var device_factory;
    console.log('');

    before(async function () {
        console.log('\t**BEFORE**');
        device_factory = await DeviceFactory.deployed();
        handler = await ProofsHandler.deployed();
    });

    it("Generates two proofs with distinct type for the same device", async function () {
        let supplier = accounts[1];
        let receiver = accounts[2];
        let deposit = 10;
        let isWaste = true;
        let id1 = 0;

        let score = 8;
        let diskUsage = 20;
        let algorithm = "v3"
        let proofAuthor = accounts[3]

        await device_factory.createDevice(id1, 0, accounts[0]);

        deviceAddress = await device_factory.getDeployedDevices(
            { from: accounts[0] }).then(devices => {
                return devices[0];
            });
        let device = await DepositDevice.at(deviceAddress);

        await device.generateFunctionProof(score, diskUsage, algorithm,
            proofAuthor, { from: accounts[0], gas: 6721975 });
        await device.generateTransferProof(supplier, receiver, deposit,
            isWaste, { from: accounts[0], gas: 6721975 });
    });

    it("Generates two proofs of the same type for two distinct devices", async function () {
        let score = 8;
        let diskUsage = 20;
        let algorithm = "v3"
        let proofAuthor = accounts[3]
        let id1 = 0;
        let id2 = 1;

        await device_factory.createDevice(id1, 0, accounts[0]);
        await device_factory.createDevice(id2, 0, accounts[0]);

        let deviceAddresses = await device_factory.getDeployedDevices(
            { from: accounts[0] }).then(devices => {
                return devices;
            });
        let device1 = await DepositDevice.at(deviceAddresses[0]);
        let device2 = await DepositDevice.at(deviceAddresses[1]);

        await device1.generateFunctionProof(score, diskUsage, algorithm,
            proofAuthor, { from: accounts[0], gas: 6721975 });
        await device2.generateFunctionProof(score, diskUsage, algorithm,
            proofAuthor, { from: accounts[0], gas: 6721975 });
    });

    it("Gets the transactions from some block", async function () {
        let score = 8;
        let diskUsage = 20;
        let algorithm = "v3"
        let proofAuthor = accounts[3]
        let proofType = "ProofFunction";
        let id1 = 0;

        await device_factory.createDevice(id1, 0, accounts[0]);

        let deviceAddress = await device_factory.getDeployedDevices(
            { from: accounts[0] }).then(devices => {
                return devices[0];
            });
        let device = await DepositDevice.at(deviceAddress);

        await device.generateFunctionProof(score, diskUsage, algorithm,
            proofAuthor, { from: accounts[0], gas: 6721975 });

        let hashes = await device.getProofs(proofType);

        let first_proof = await device.getProof(hashes[0], proofType);
        let block_number = await web3.utils.toDecimal(first_proof.block_number);
        for (i of [2, 1, 0, -1, -2]) {
            let block = await web3.eth.getBlock(block_number + i);
            let receipt = await web3.eth.getTransactionReceipt(block.transactions[0]);
            printAddresses(accounts[0], block_number - i, device_factory,
                handler, device, receipt)
        }
    });
});

function extractEvents(receipt) {
    return receipt.logs[0].args
}

function printAddresses(account, block_number, device_factory, handler, device,
                                                                    receipt) {
    console.log(`FOR BLOCK_NUMBER ${block_number}\n`)
    console.log(`Account: ${account}`);
    console.log(`DeviceFactory: ${device_factory.address}`);
    console.log(`Device: ${device.address}`);
    console.log(`Handler: ${handler.address}`);
    console.log(`Receipt from: ${receipt.from}`);
    console.log(`Receipt to: ${receipt.to}\n\n\n`);
}
