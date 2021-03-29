// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/structs/EnumerableSet.sol";
import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract chainlinkFeed is Ownable {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
    
    function changeFeedAddress(address newContract) public onlyOwner {
        priceFeed = AggregatorV3Interface(newContract);
    }
    
    function getLatestPrice() public view returns (uint256) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return uint256(price);
    }
}

contract Treasur is Ownable, IERC721Receiver {
    using EnumerableSet for EnumerableSet.Bytes32Set;
    
    struct bestOffer {
        address offerer;
        uint256 value;
        uint256 timestamp;
    }
    
    address childContract = address(0);
    // Mainnet: 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
    // Testnet: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
    chainlinkFeed priceFeed = new chainlinkFeed();
    mapping (bytes32 => bestOffer) offerBalances; // URI: address: balance: timestamp
    uint256 externalBalance = 0; // Balance held in escrow
    mapping (bytes32 => address) tokenCreators;
    EnumerableSet.Bytes32Set awaitingMint;
    EnumerableSet.Bytes32Set awaitingSell;
    uint16 creatorFee = 900; // stored as fee / 10
    uint16 platformFee = 100;
    uint16 creatorFeeSecondary = 25;
    uint16 platformFeeSecondary = 50;
    uint16 sellerFee = 925;
    
    event ReceivedExternal(address, uint);
    
    receive() external payable {
        emit ReceivedExternal(msg.sender, msg.value);
    }
    
    function setFees(uint16 _creatorFee, uint16 _creatorFeeSecondary, uint16 _sellerFee, uint16 _platformFee, uint16 _platformFeeSecondary) external onlyOwner returns (bool) {
        creatorFee = _creatorFee;
        creatorFeeSecondary = _creatorFeeSecondary;
        sellerFee = _sellerFee;
        platformFee = _platformFee;
        platformFeeSecondary = _platformFeeSecondary;
        return true;
    }
    
    function withdraw() external onlyOwner payable {
        // logic to transfer 
    }
    
    function setChildContract(address _childContract) external onlyOwner {
        childContract = _childContract;
    }
    
    function setChainlinkFeed(address _chainlinkFeed) external onlyOwner {
        priceFeed.changeFeedAddress(_chainlinkFeed);
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
        require(msg.value > priceFeed.getLatestPrice()*100000000000, "Sent value is too low");
        // 10 USD MATIC = 10*latestPrice*(10^-8)*(10^18) (convert to wei)
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
