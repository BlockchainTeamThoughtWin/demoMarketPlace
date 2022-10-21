// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


interface IERC721Mint is IERC721{
    function mint(address to, uint96 royality, string memory tokenURI)
        external
        returns (uint256);
}
