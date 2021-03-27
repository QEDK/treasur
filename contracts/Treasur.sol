// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";

contract Treasur is Ownable, IERC721Receiver {
    address ChildContract = address(0);
    
    function setMinterContract(address childContract) external onlyOwner {
        ChildContract = childContract;
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    function mint(string memory tokenURI) external onlyOwner returns (uint256) {
        require(ChildContract != address(0), "Child contract address should be set");
    }
    
    function offer(uint256 amount, string memory tokenURI) external payable returns (uint256) {
        require(msg.value == amount, "Received amount does not equal called value");
        
    }
    
    function approveMint(string memory tokenURI) external onlyOwner returns (bool) {
        
    }
}
