// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0 <=0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

import "hardhat/console.sol";

interface YTV721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function setBaseURI(string memory baseURIStr) external;
    function mintVideo(string memory tokenURIStr, address offerer) external returns (uint256);
    function tokenURI(uint256 tokenId) external returns (string memory);
}

contract ChainlinkFeed is Ownable {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        // Mainnet: 0xF9680D99D6C9589e2a93a78A04A279e509205945
        // Testnet: 0x0715A7794a1dc8e42615F059dD6e406A6594651A
        priceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
    }

    function changeFeedAddress(address newContract) external onlyOwner {
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

    struct Listing {
        address owner;
        uint256 ID;
        uint256 minBid;
        uint256 timestamp;
    }

    // Mainnet: 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
    // Testnet: 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa
    IERC20 WETH = IERC20(0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1); // WETH (PoS)
    YTV721 YTV = YTV721(0x30235F88dD53bb2c71ffD2C52a756aB798381857);
    ChainlinkFeed priceFeed = new ChainlinkFeed();
    mapping (bytes32 => uint256) tokenMap;
    mapping (bytes32 => bestOffer) offerBalances; // URI: address: balance: timestamp
    mapping (bytes32 => bestOffer) marketBalances;
    mapping (bytes32 => Listing) marketDetails;
    uint256 withdrawableAmount = 0;
    mapping (bytes32 => address) tokenCreators;
    EnumerableSet.Bytes32Set awaitingMint;
    EnumerableSet.Bytes32Set Minted;
    EnumerableSet.Bytes32Set Listed;
    uint16 creatorFee = 900; // stored as fee / 10
    uint16 platformFee = 100;
    uint16 creatorFeeSecondary = 25;
    uint16 platformFeeSecondary = 50;
    uint16 sellerFee = 925;
    uint256 minOfferTime = 1 weeks;
    uint256 minMarketTime = 1 weeks;
    uint16 minOffer = 5; // upto 65535 USD
    uint16 minBidGlobal = 5;

    event ReceivedExternal(address indexed addr, uint256 amount);
    event Refund(address indexed addr, uint256 amount);
    event Mint(address indexed addr, uint256 tokenId, string tokenURIStr);
    event List(address indexed addr, uint256 tokenId, string tokenURIStr, uint256 bidAmount);
    event Bid(address indexed addr, uint256 tokenId, bytes32 tokenURI, uint256 bidAmount);
    event Sale(address indexed addr, uint256 tokenId, bytes32 tokenURI, uint256 saleAmount);

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

    function setMarketTime(uint256 _minOfferTime, uint256 _minMarketTime) external onlyOwner {
        minOfferTime = _minOfferTime;
        minMarketTime = _minMarketTime;
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

    function setNFT(YTV721 _YTV) external onlyOwner {
        YTV = _YTV;
    }

    function onERC721Received(
        address /* operator */, address /* from */, uint256 /* tokenId */, bytes calldata /* data */
        ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function chainLinkPrice() external view returns (uint) {
        return priceFeed.getLatestPrice();
    }

    function isOffered(bytes32 tokenURI) external view returns (bool) {
        return awaitingMint.contains(tokenURI);
    }

    function isMinted(bytes32 tokenURI) external view returns (bool) {
        return Minted.contains(tokenURI);
    }

    function isListed(bytes32 tokenURI) external view returns (bool) {
        return Listed.contains(tokenURI);
    }

    function offer(bytes32 tokenURI, uint256 amount) external returns (bool) {
        require(!awaitingMint.contains(tokenURI) && !Minted.contains(tokenURI), "NFT is already awaiting mint or minted");
        require(((amount*priceFeed.getLatestPrice())/10e25) >= minOffer, "Sent value is too low");
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

    function counterOffer(bytes32 tokenURI, uint256 amount) external returns (bool) {
        require(awaitingMint.contains(tokenURI), "This token is not awaiting mint");
        if(msg.sender == offerBalances[tokenURI].offerer) {
            offerBalances[tokenURI].value += amount;
            bool success = WETH.transferFrom(msg.sender, address(this), amount);
            require(success, "Transaction was not approved");
        } else {
            require(((amount - offerBalances[tokenURI].value)*priceFeed.getLatestPrice()/10e25) >= 1, "Sent value does not meet differential");
            bestOffer memory refund = offerBalances[tokenURI];
            offerBalances[tokenURI] = bestOffer(payable(msg.sender), amount, refund.timestamp);
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
        uint256 tokenId = YTV.mintVideo(tokenURIStr, top.offerer);
        tokenMap[tokenURI] = tokenId;
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

    function list(bytes32 tokenURI, uint256 bidAmount) external returns (bool) {
        require(Minted.contains(tokenURI), "NFT has not been minted yet");
        uint256 tokenId = tokenMap[tokenURI];
        require(msg.sender == YTV.ownerOf(tokenId), "Only the NFT owner can list");
        require(((bidAmount*priceFeed.getLatestPrice())/10e25) >= minBidGlobal, "Bid amount is too low");
        Listed.add(tokenURI);
        marketDetails[tokenURI] = Listing(msg.sender, tokenId, bidAmount, block.timestamp);
        YTV.safeTransferFrom(msg.sender, address(this), tokenId);
        emit List(msg.sender, tokenId, YTV.tokenURI(tokenId), bidAmount);
        return true;
    }

    function unlist(bytes32 tokenURI) external returns (bool) {
        require(Listed.contains(tokenURI), "NFT has not been listed for sale");
        require(msg.sender == marketDetails[tokenURI].owner, "Only NFT owner can unlist");
        require(marketBalances[tokenURI].offerer == address(0), "NFT has bidders, cannot unlist");
        Listed.remove(tokenURI);
        delete marketDetails[tokenURI];
        delete marketBalances[tokenURI];
        YTV.safeTransferFrom(address(this), msg.sender, tokenMap[tokenURI]);
        return true;
    }

    function changeAsk(bytes32 tokenURI, uint256 newBidAmount) external returns (bool) {
        require(Listed.contains(tokenURI), "NFT has not been listed for sale");
        require(msg.sender == marketDetails[tokenURI].owner, "Only NFT owner can modify");
        require(((newBidAmount*priceFeed.getLatestPrice())/10e25) >= minOffer, "Bid amount is too low");
        require(marketBalances[tokenURI].offerer == address(0), "Cannot modify ask after bids");
        marketDetails[tokenURI].minBid = newBidAmount;
        return true;
    }

    function bid(bytes32 tokenURI, uint256 amount) external returns (bool) {
        require(Listed.contains(tokenURI), "NFT has not been listed for sale");
        require(amount >= marketDetails[tokenURI].minBid, "Amount does not meet minimum bid");
        require((((amount - marketBalances[tokenURI].value)*priceFeed.getLatestPrice())/10e25) >= 1, "Amount too low or doesn't meet differential");
        bestOffer memory refund = marketBalances[tokenURI];
        marketBalances[tokenURI] = bestOffer(msg.sender, amount, marketDetails[tokenURI].timestamp);
        bool success = WETH.transferFrom(msg.sender, address(this), amount);
        require(success, "Transaction was not approved");
        if(refund.offerer != address(0)) {
            _refundTopOffer(refund);
        }
        return true;
    }

    function closeMarket(bytes32 tokenURI) external onlyOwner returns (bool) {
        require(Listed.contains(tokenURI), "NFT has not been listed for sale");
        require((block.timestamp - marketDetails[tokenURI].timestamp) >= minMarketTime, "Market cannot be closed yet");
        require(marketBalances[tokenURI].offerer != address(0), "NFT has no bidder, use unlist()");
        Listed.remove(tokenURI);
        Listing memory details = marketDetails[tokenURI];
        bestOffer memory balance = marketBalances[tokenURI];
        delete marketDetails[tokenURI];
        delete marketBalances[tokenURI];
        uint256 sellerFeeAmount = (sellerFee*balance.value)/1000;
        uint256 creatorFeeAmount = (creatorFeeSecondary*balance.value)/1000;
        withdrawableAmount += (balance.value - (sellerFeeAmount + creatorFeeAmount));
        YTV.safeTransferFrom(address(this), balance.offerer, details.ID);
        bool success1 = WETH.transfer(details.owner, sellerFeeAmount);
        require(success1, "Not enough WETH in contract");
        bool success2 = WETH.transfer(tokenCreators[tokenURI], creatorFeeAmount);
        require(success2, "Not enough WETH in contract");
        emit Sale(balance.offerer, details.ID, tokenURI, balance.value);
        return true;
    }

    function _refundTopOffer(bestOffer memory topOffer) internal {
        bool success = WETH.transfer(topOffer.offerer, topOffer.value);
        require(success, "Not enough WETH in contract");
        emit Refund(topOffer.offerer, topOffer.value);
    }

    function _stringToBytes32(string memory str) pure internal returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(str);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(str, 32))
        }
    }
}
