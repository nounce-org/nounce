//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOwnable {
    function owner() external view returns (address);
}

interface IERC1820Registry {
    function getInterfaceImplementer(address _addr, bytes32 _interfaceHash) external view returns (address);
}

interface IWormholeRelayer {
    function quoteEVMDeliveryPrice(uint256 targetChain, uint256 valueToSend, uint256 gasLimit) external view returns (uint256 cost, uint256 gasPrice);
    function sendPayloadToEvm(uint256 targetChain, address targetAddress, bytes memory data, uint256 valueToSend, uint256 gasLimit) external payable;
}

contract CrossChainRelay {

    IWormholeRelayer public wormholeRelayer;
    IERC1820Registry constant ERC1820_REGISTRY = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24); // Address of ERC-1820 Registry on Ethereum Mainnet
    bytes32 public constant OUR_INTERFACE_HASH = keccak256("OurUniqueInterfaceName");

    uint256 public constant TARGET_CHAIN = 10000;
    address public constant TARGET_ADDRESS = 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24;
    uint256 public constant VALUE_TO_SEND = 50000;
    uint256 public constant GAS_LIMIT = 1000000;

    event RegistryEvent(address indexed contractAddress, uint256 indexed sourceChain, address implementerAddress);

    constructor(address _wormholeRelayer) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function relayData(address contractAddress, uint256 sourceChain, address implementerAddress) internal {
        emit RegistryEvent(contractAddress, sourceChain, implementerAddress);

        (uint256 cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(TARGET_CHAIN, VALUE_TO_SEND, GAS_LIMIT);
        require(msg.value >= cost, "Insufficient funds sent");

        bytes memory payload = abi.encode(contractAddress, sourceChain, implementerAddress);
        wormholeRelayer.sendPayloadToEvm{value: cost}(TARGET_CHAIN, TARGET_ADDRESS, payload, VALUE_TO_SEND, GAS_LIMIT);

        uint256 refund = msg.value - cost;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
    }

    function isSenderOwnerOf(address contractAddress) internal view returns (bool) {
        IOwnable ownable = IOwnable(contractAddress);
        return ownable.owner() == msg.sender;
    }

    function setImplementerByOwner(address contractAddress, uint256 chainID, address implementerAddress) public {
        require(isSenderOwnerOf(contractAddress), "Caller is not the owner of the contract");
        relayData(contractAddress, chainID, implementerAddress);
    }

    function relayImplementation(address contractAddress) external payable {
        address implementerAddress = ERC1820_REGISTRY.getInterfaceImplementer(contractAddress, OUR_INTERFACE_HASH);
        require(implementerAddress != address(0), "No implementation found for the interface");

        uint256 currentChainID;
        assembly {
            currentChainID := chainid()
        }

        relayData(contractAddress, currentChainID, implementerAddress);
    }

    // ... other functions and logic for your contract

}