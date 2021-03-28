// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/structs/EnumerableSet.sol";

contract Treasur is Ownable, IERC721Receiver {
    using EnumerableSet for EnumerableSet.Bytes32Set;
    address childContract = address(0);
    // Mainnet: 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
    // Testnet: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
    address chainlinkFeed = 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada; // MATIC/USD
    mapping (bytes32 => bestOffer) offerBalances; // URI: address: balance: timestamp
    uint256 externalBalance = 0; // Balance held in escrow
    mapping (bytes32 => address) tokenCreators;
    EnumerableSet.Bytes32Set awaitingMint;
    EnumerableSet.Bytes32Set awaitingSell;
    
    event ReceivedExternal(address, uint);
    
    struct bestOffer {
        address offerer;
        uint256 value;
        uint256 timestamp;
    }
    
    receive() external payable {
        emit ReceivedExternal(msg.sender, msg.value);
    }
    
    function withdraw() external onlyOwner payable {
        // logic to transfer 
    }
    
    function setChildContract(address _childContract) external onlyOwner {
        childContract = _childContract;
    }
    
    function setChainlinkFeed(address _chainlinkFeed) external onlyOwner {
        chainlinkFeed = _chainlinkFeed;
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    function _mint(string memory tokenURI) internal returns (uint256) {
        require(childContract != address(0), "Child contract address should be set");
        return 0;
    }
    
    function offer(bytes32 tokenURI) external payable returns (bool) {
        require(!awaitingMint.contains(tokenURI), "This token is already awaiting mint");
        require(msg.value > 0);  // add Chainlink here
        externalBalance += msg.value;
        offerBalances[tokenURI] = bestOffer(msg.sender, msg.value, block.timestamp);
        awaitingMint.add(tokenURI);
        return true;
    }
    
    function revokeOffer(bytes32 tokenURI) external payable returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        return true;
    }

    function counterOffer(bytes32 tokenURI) external payable returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        require(msg.value > offerBalances[tokenURI].value, "Sent value less than highest offer");
        externalBalance += msg.value;
        return true;
    }
    
    function approveMint(bytes32 tokenURI, string memory tokenURIStr, address tokenCreator) external onlyOwner returns (uint256) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        awaitingMint.remove(tokenURI);
        uint256 tokenId = _mint(tokenURIStr);
        tokenCreators[tokenURI] = tokenCreator;
        return tokenId;
    }
    
    function declineMint(bytes32 tokenURI) external onlyOwner returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        awaitingMint.remove(tokenURI);
        return true;
    }
}
