// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

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

    function mintVideo(string memory tokenURI) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(owner(), newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
