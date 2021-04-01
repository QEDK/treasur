// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0 <=0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/structs/EnumerableSet.sol";
import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract YTVideo is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI = "https://treasur.co/token/";
    
    constructor() ERC721("YTVideo", "YT") {
    }
    
    function setBaseURI(string memory baseURIStr) external onlyOwner {
        baseURI = baseURIStr;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    
    function mintVideo(string memory tokenURI, address addr) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(addr, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}

contract ChainlinkFeed is Ownable {
    AggregatorV3Interface internal priceFeed;

    constructor(address _chainlinkFeed) {
        priceFeed = AggregatorV3Interface(_chainlinkFeed);
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
        address payable offerer;
        uint256 value;
        uint256 timestamp;
    }
    
    // Mainnet: 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
    // Testnet: 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa
    IERC20 WETH = IERC20(0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619); // WETH (PoS)
    YTVideo NFT = new YTVideo();
    // Mainnet: 0xF9680D99D6C9589e2a93a78A04A279e509205945
    // Testnet: 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
    ChainlinkFeed priceFeed = new ChainlinkFeed(0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619);
    mapping (bytes32 => bestOffer) offerBalances; // URI: address: balance: timestamp
    uint256 withdrawableAmount = 0;
    mapping (bytes32 => address payable) tokenCreators;
    EnumerableSet.Bytes32Set awaitingMint;
    EnumerableSet.Bytes32Set Minted;
    uint16 creatorFee = 900; // stored as fee / 10
    uint16 platformFee = 100;
    uint16 creatorFeeSecondary = 25;
    uint16 platformFeeSecondary = 50;
    uint16 sellerFee = 925;
    uint256 minOfferTime = 1 weeks;
    uint256 minMarketTime = 1 weeks;
    uint16 minOffer = 10; // upto 65535 USD
    
    event ReceivedExternal(address indexed addr, uint256 amount);
    event Refund(address indexed addr, uint256 amount);
    event Mint(address indexed addr, uint256 tokenId, string tokenURIStr);
    
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
       payable(owner()).transfer(address(this).balance);
    }
    
    function withdrawWETH() external onlyOwner {
        WETH.transfer(owner(), withdrawableAmount);
    }
    
    function setIERC20(IERC20 _WETH) external onlyOwner {
        WETH = _WETH;
    }
    
    function setChainlinkFeed(address _chainlinkFeed) external onlyOwner {
        priceFeed.changeFeedAddress(_chainlinkFeed);
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    function offer(bytes32 tokenURI, uint256 amount) external returns (bool) {
        require(!awaitingMint.contains(tokenURI) || Minted.contains(tokenURI), "This token is already awaiting mint");
        require(((amount*priceFeed.getLatestPrice())/1e25) >= minOffer, "Sent value is too low");
        offerBalances[tokenURI] = bestOffer(payable(msg.sender), amount, block.timestamp);
        awaitingMint.add(tokenURI);
        bool success = WETH.transferFrom(msg.sender, address(this), amount);
        require(success, "Transaction was not approved");
        return true;
    }
    
    function revokeOffer(bytes32 tokenURI) external returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        require(msg.sender == offerBalances[tokenURI].offerer, "No permission to revoke offer");
        require((block.timestamp - offerBalances[tokenURI].timestamp) >= minOfferTime, "Offer cannot be revoked yet");
        awaitingMint.remove(tokenURI);
        bestOffer memory refund = offerBalances[tokenURI];
        delete offerBalances[tokenURI];
        _refundTopOffer(refund);
        return true;
    }

    function counterOffer(bytes32 tokenURI, uint256 amount) external payable returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        if(msg.sender == offerBalances[tokenURI].offerer) {
            offerBalances[tokenURI].value += amount;
            bool success = WETH.transferFrom(msg.sender, address(this), amount);
            require(success, "Transaction was not approved");
        } else {
            require(amount > offerBalances[tokenURI].value, "Sent value less than highest offer");
            require(((amount - offerBalances[tokenURI].value)*priceFeed.getLatestPrice()/1e25) > 1, "Sent value does not meet differential");
            bestOffer memory refund = offerBalances[tokenURI];
            offerBalances[tokenURI] = bestOffer(payable(msg.sender), msg.value, block.timestamp);
            bool success = WETH.transferFrom(msg.sender, address(this), amount);
            require(success, "Transaction was not approved");
            _refundTopOffer(refund);
        }
        return true;
    }
    
    function approveMint(bytes32 tokenURI, string memory tokenURIStr, address payable tokenCreator) external onlyOwner returns (uint256) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        awaitingMint.remove(tokenURI);
        Minted.add(tokenURI);
        tokenCreators[tokenURI] = tokenCreator;
        bestOffer memory top = offerBalances[tokenURI];
        delete offerBalances[tokenURI];
        withdrawableAmount += (top.value - ((creatorFee*top.value)/1000));
        uint256 tokenId = NFT.mintVideo(tokenURIStr, top.offerer);
        bool success = WETH.transfer(tokenCreator, (creatorFee*top.value)/1000);
        require(success, "Not enough WETH in contract");
        emit Mint(top.offerer, tokenId, tokenURIStr);
        return tokenId;
    }
    
    function declineMint(bytes32 tokenURI) external onlyOwner returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        awaitingMint.remove(tokenURI);
        bestOffer memory refund = offerBalances[tokenURI];
        delete offerBalances[tokenURI];
        _refundTopOffer(refund);
        return true;
    }
    
    function _refundTopOffer(bestOffer memory topOffer) internal {
        bool success = WETH.transfer(topOffer.offerer, topOffer.value);
        require(success, "Not enough WETH in contract");
        emit Refund(topOffer.offerer, topOffer.value);
    }
}
