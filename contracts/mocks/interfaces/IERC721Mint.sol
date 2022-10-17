// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

interface IERC721Mint is IERC721, IERC2981 {
    function mint(
        address to,
        string memory tokenURI,
        uint96 _royality
    ) external returns (uint256);
}
