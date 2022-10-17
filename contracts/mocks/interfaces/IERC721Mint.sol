// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import  "@openzeppelin/contracts/interfaces/IERC2981.sol";


interface IERC721Mint is IERC721, IERC2981{
    function mint(address to, uint96 royality, string memory tokenURI)
        external
        returns (uint256);
}
