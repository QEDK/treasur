// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/structs/EnumerableSet.sol";

contract Treasur is Ownable, IERC721Receiver {
    using EnumerableSet for EnumerableSet.Bytes32Set;
    address ChildContract = address(0);
    mapping (bytes32 => mapping(address => uint256)) balances;
    EnumerableSet.Bytes32Set awaitingMint;
    EnumerableSet.Bytes32Set awaitingSell;
    
    function setMinterContract(address childContract) external onlyOwner {
        ChildContract = childContract;
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    function _mint(string memory tokenURI) internal returns (uint256) {
        require(ChildContract != address(0), "Child contract address should be set");
    }
    
    function offer(uint256 amount, bytes32 tokenURI) external payable returns (uint256) {
        require(msg.value == amount, "Received amount does not equal called value");
        balances[tokenURI][msg.sender] = msg.value; // add Chainlink here
        awaitingMint.add(tokenURI);
    }
    
    function approveMint(bytes32 tokenURI, string memory tokenURIStr) external onlyOwner returns (uint256) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        awaitingMint.remove(tokenURI);
        uint256 tokenId = _mint(tokenURIStr);
        awaitingSell.add(tokenURI);
        return tokenId;
    }
}
