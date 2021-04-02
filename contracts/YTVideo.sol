// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract YTVideo is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI = "https://treasur.co/token/";
    address public minter;

    constructor() ERC721("YTVideo", "YT") {
    }

    function setBaseURI(string memory baseURIStr) external onlyOwner {
        baseURI = baseURIStr;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    function mintVideo(string memory tokenURI, address offerer) external returns (uint256) {
        require(msg.sender == minter && minter != address(0), "Invalid sender");
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(offerer, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
