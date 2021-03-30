<<<<<<< HEAD
// SPDX-License-Identifier: GPL-3.0-or-later
=======
// SPDX-License-Identifier: MIT
>>>>>>> 5a7ad83050c056ef0f4786cafc11148b4c823ab6
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract YTVideo is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
<<<<<<< HEAD
    string baseURI = "https://treasur.co/token/";
    
    constructor() ERC721("YTVideo", "YT") {
    }
    
    function setBaseURI(string memory baseURIStr) external onlyOwner {
        baseURI = baseURIStr;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
=======
    
    constructor() public ERC721("YTVideo", "YT") {
>>>>>>> 5a7ad83050c056ef0f4786cafc11148b4c823ab6
    }
    
    function mintVideo(string memory tokenURI) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(owner(), newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
