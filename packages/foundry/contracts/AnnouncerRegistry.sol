// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MainRegistry {

    // Contract owner, for multisig control.
    address public owner;

    // Structure to hold an implementer’s details.
    struct ImplementerDetails {
        address implementerAddress;
        uint256 implementerChainID;
        bool isLocked;
    }

    // Structure to hold a contract’s details.
    struct ContractDetails {
        address contractAddress;
        uint256 contractChainID;
    }

    // Main registry: contractChainID => contractAddress => ImplementerDetails
    mapping(uint256 => mapping(address => ImplementerDetails)) public registry;

    // Reverse registry: implementerChainID => implementerAddress => ContractDetails[]
    mapping(uint256 => mapping(address => ContractDetails[])) public reverseRegistry;

    // Events
    event EntryAdded(address indexed contractAddress, uint256 indexed contractChainID, address indexed implementerAddress, uint256 implementerChainID);
    event EntryRemoved(address indexed contractAddress, uint256 indexed contractChainID);
    event ContractLocked(address indexed contractAddress, uint256 indexed contractChainID);
    event ContractUnlocked(address indexed contractAddress, uint256 indexed contractChainID);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory additionalVaas,
        bytes32 sourceAddress,
        uint16 sourceChain,
        bytes32 deliveryHash
    ) external {
        (address contractAddress, uint256 contractChainID, address implementerAddress, uint256 implementerChainID) = abi.decode(payload, (address, uint256, address, uint256));

        // TODO Check values
        require(additionalVaas.length > 0, "TODO: check additional Vaas");
        require(sourceAddress != bytes32(0), "TODO: Add source address check");
        require(deliveryHash != bytes32(0), "TODO: Add hash  check");

        require(!registry[contractChainID][contractAddress].isLocked, "Contract is locked");

        // Update the main registry
        registry[sourceChain][contractAddress] = ImplementerDetails(implementerAddress, implementerChainID, false);

        // Update the reverse registry
        reverseRegistry[implementerChainID][implementerAddress].push(ContractDetails(contractAddress, contractChainID));

        emit EntryAdded(contractAddress, contractChainID, implementerAddress, implementerChainID);
    }

    function removeEntry(uint256 contractChainID, address contractAddress) external onlyOwner {
        ImplementerDetails storage details = registry[contractChainID][contractAddress];
        require(details.implementerAddress != address(0), "Entry does not exist");
        require(!details.isLocked, "Contract is locked");

        // Remove contract's chain ID from the reverse registry's array for the given implementer
        ContractDetails[] storage linkedContracts = reverseRegistry[details.implementerChainID][details.implementerAddress];
        for (uint256 i = 0; i < linkedContracts.length; i++) {
            if (linkedContracts[i].contractAddress == contractAddress && linkedContracts[i].contractChainID == contractChainID) {
                linkedContracts[i] = linkedContracts[linkedContracts.length - 1];
                linkedContracts.pop();
                break;
            }
        }

        // Remove from main mapping
        delete registry[contractChainID][contractAddress];

        emit EntryRemoved(contractAddress, contractChainID);
    }

    function updateImplementerDetails(uint256 contractChainID, address contractAddress, address newImplementerAddress, uint256 newImplementerChainID) external onlyOwner {
        ImplementerDetails storage details = registry[contractChainID][contractAddress];
        require(details.implementerAddress != address(0), "Entry does not exist");
        require(!details.isLocked, "Contract is locked");

        details.implementerAddress = newImplementerAddress;
        details.implementerChainID = newImplementerChainID;
    }

    function lockContract(uint256 contractChainID, address contractAddress) external onlyOwner {
        ImplementerDetails storage details = registry[contractChainID][contractAddress];
        require(details.implementerAddress != address(0), "Entry does not exist");

        details.isLocked = true;
        emit ContractLocked(contractAddress, contractChainID);
    }

    function unlockContract(uint256 contractChainID, address contractAddress) external onlyOwner {
        ImplementerDetails storage details = registry[contractChainID][contractAddress];
        require(details.implementerAddress != address(0), "Entry does not exist");

        details.isLocked = false;
        emit ContractUnlocked(contractAddress, contractChainID);
    }

    function getImplementerDetails(uint256 contractChainID, address contractAddress) external view returns (ImplementerDetails memory) {
        return registry[contractChainID][contractAddress];
    }

    function getLinkedContracts(uint256 implementerChainID, address implementerAddress) external view returns (ContractDetails[] memory) {
        return reverseRegistry[implementerChainID][implementerAddress];
    }

    function isContractLocked(uint256 contractChainID, address contractAddress) external view returns (bool) {
        return registry[contractChainID][contractAddress].isLocked;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}