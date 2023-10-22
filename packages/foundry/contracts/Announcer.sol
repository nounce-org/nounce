//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/// @title Announcer
/// @dev A contract that allows the owner to make announcements and supports ERC165 interface detection.
contract Announcer is IERC165 {
    
    address public immutable owner;

    /// @notice Emitted when an announcement is made by the owner.
    /// @param signer The address of the announcer (owner).
    /// @param signature The bytes signature associated with the announcement.
    /// @param timestamp The block timestamp when the announcement was made.
    /// @param data The data (based on schema.org JSON-ld) of the announcement.
    event Announcement(
        address indexed signer, 
        bytes signature, 
        uint timestamp,
        string data
    );

    /// @notice Allows the owner to make an announcement.
    /// @dev Emits the `Announcement` event.
    /// @param signature The signature associated with the announcement.
    /// @param data The data or message of the announcement.
    // TODO: OnlyOwner for non-demo
    function announce(bytes calldata signature, string calldata data) public  {
        emit Announcement(msg.sender, signature, block.timestamp, data);
    }

    /// @dev Constructor initializes the contract.
    constructor(address _owner) {
        owner = _owner;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    /// @dev Unique identifier for the `announce` function to support ERC165 interface detection.
    bytes4 private constant _INTERFACE_ID_ANNOUNCE = bytes4(keccak256("announce(bytes,string)"));

    /// @notice Checks if the contract implements a given interface.
    /// @dev Returns true for the ERC165 interface and the `announce` function's identifier.
    /// @param interfaceId The identifier of the interface to check.
    /// @return bool indicating if the contract supports the queried interface.
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == _INTERFACE_ID_ANNOUNCE || interfaceId == type(IERC165).interfaceId;
    }
}