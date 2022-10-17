// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "contracts/mocks/interfaces/IERC721Mint.sol";
import "contracts/mocks/interfaces/IblackList.sol";


contract MarketPlace is Initializable{
    using SafeMathUpgradeable for uint256;

    struct SellerDetails {
        address sellerAddress;
        address nftAddress;
        address paymentAssetAddress;
        uint96 royality;
        uint256 amount;
        uint256 nonce;
        uint256 tokenId;
        string tokenUri;
        bytes sellerSignature;
    }

    mapping(uint256 => bool) isnonceprocessed;

    uint256 platFormFee;
    uint256 decimalPrecision;
    IblackList blacklist;

    function initialize( IblackList _blacklistAddress) public initializer{
        platFormFee = 250;
        decimalPrecision = 100;
        blacklist = _blacklistAddress;
    }

    // Events
    event lazybuy(
        uint256 nonce,
        address seller,
        address buyer,
        address assetAddress,
        uint256 tokenId

    );

    function LazyBuy(SellerDetails calldata seller) external payable {
        require(blacklist._isPermitted(msg.sender), "MarketPlace: user is blacklisted");
        require(
            isnonceprocessed[seller.nonce] == false,
            "MarketPlace: Nonce is already Processed"
        );
        address buyer = payable(msg.sender);
        bytes32 _messageHash = sellerSignVerifcation(
            seller.nonce,
            seller.amount,
            seller.tokenUri,
            seller.royality
        );
        bytes32 _ethSignedMessageHash = getEthSignedMessagehash(_messageHash);
        address signer = getSigner(
            _ethSignedMessageHash,
            seller.sellerSignature
        );
        require(
            seller.sellerAddress == signer,
            "MarketPlace: signature invalid or unauthorized"
        );
        IERC721Mint instance = IERC721Mint(seller.nftAddress);
        if (seller.tokenId != 1) {
            require(
                instance.isApprovedForAll(
                    seller.sellerAddress,
                    address(this)
                ) || instance.getApproved(seller.tokenId) == address(this),
                "MarketPlace: Collection must be approved."
            );
            /// transfer the nft.RoleManager
            instance.transferFrom(seller.sellerAddress, buyer, seller.tokenId);
        } else {
            uint256 tokenId = instance.mint(
                seller.sellerAddress,
                seller.royality,
                seller.tokenUri
            );
            require(
                instance.isApprovedForAll(
                    seller.sellerAddress,
                    address(this)
                ) || instance.getApproved(tokenId) == address(this),
                "MarketPlace: Collection must be approved."
            );
            instance.transferFrom(seller.sellerAddress, buyer, seller.tokenId);
        }

        //fund transfer
        IERC20 instance20 = IERC20(seller.paymentAssetAddress);
        require(
            instance20.balanceOf(buyer) >= seller.amount,
            "MarketPlace: Insufficient Amount"
        );

        require(
            instance20.allowance(buyer, address(this)) >= seller.amount,
            "MarketPlace: Check the token allowance."
        );
        
        uint256 feeOnPlatForm = (seller.amount).mul(platFormFee).div(decimalPrecision).div(100);

        instance20.transferFrom(buyer, address(this), feeOnPlatForm);

        (address receiver, uint256 royaltyAmount) = instance.royaltyInfo(
            seller.tokenId,
            seller.amount
        );

        uint256 remaining_amount = seller.amount;

        if (royaltyAmount > 0) {
            if (seller.sellerAddress != receiver) {
                instance20.transferFrom(buyer, receiver, royaltyAmount);
                remaining_amount -= royaltyAmount;
            }
        }
        //         remaining_amount -= feeOnPlatform;
        instance20.transferFrom(buyer, seller.sellerAddress, seller.amount);



        /// nonce is ture
        isnonceprocessed[seller.nonce] = true;
        
        emit lazybuy(
            seller.nonce,
            seller.sellerAddress,
            buyer,
            seller.paymentAssetAddress,
            seller.tokenId
        );
    }

    function sellerSignVerifcation(
        uint256 _nonce,
        uint256 minPrice,
        string memory tokenUri,
        uint256 royality
    ) public pure returns (bytes32) {
        return
            keccak256(abi.encodePacked(_nonce, minPrice, tokenUri, royality));
    }

    function getEthSignedMessagehash(bytes32 _messageHash)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                (
                    abi.encodePacked(
                        "\x19Ethereum Signed Message:\n32",
                        _messageHash
                    )
                )
            );
    }

    function getSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        address signer = ecrecover(
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _ethSignedMessageHash
                )
            ),
            v,
            r,
            s
        );
        return signer;
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 32))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}