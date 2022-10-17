// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "contracts/mocks/interfaces/IERC721Mint.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "contracts/mocks/interfaces/Iblacklist.sol";

contract MarketPlace is Initializable, OwnableUpgradeable {
    using SafeMathUpgradeable for uint256;
    uint256 public platFormFeePercent; /// State variable for PlatFormFeePercent.
    uint256 public constant decimalPrecision = 100;
    IblackList blacklist;

    struct SellerDetails {
        uint256 nonce;
        address seller;
        address assetAddress;
        address paymentAssetAddress;
        uint256 tokenId;
        uint96 royality;
        uint256 amount;
        bytes seller_signature;
        string tokenUri;
        uint256 startTime;
        uint256 endTime;
    }

    struct WinnerDetails {
        address winnerAddress;
        uint256 amount;
        bytes winnerSignature;
        uint256 bidTime;
        uint256 nonce;
    }

    event flatSale(
        uint256 nonce,
        address seller,
        uint256 tokenId,
        address assetAddress,
        uint256 amount
    );

    event lazy_Auction(
        uint256 tokenId,
        address assetAddress,
        uint256 amount,
        address winner,
        address seller
    );

    event lazy_Auction_duration(uint256 startTime, uint256 endTime);

    mapping(uint256 => bool) public isNonceProcessed; //mapping for nonce.

    function initialize(IblackList _blacklistAddress) public initializer {
        __Ownable_init();

        platFormFeePercent = 250;
        blacklist = _blacklistAddress;
    }

    function setPlatFormFeePercent(uint256 _newPlatFormFeePercent)
        public
        onlyOwner
    {
        platFormFeePercent = _newPlatFormFeePercent;
    }

    function lazyAuction(
        SellerDetails calldata sellerDetails,
        WinnerDetails calldata winnerDetails
    ) external {
        require(blacklist._isPermitted(msg.sender), "user is blacklisted");
        require(
            !isNonceProcessed[sellerDetails.nonce],
            "MarketPlace: nonce already process"
        );

        address sellerSigner = verifySellerSign(sellerDetails);

        require(
            sellerDetails.seller == sellerSigner,
            "MarketPlace: seller sign verification failed"
        );

        address winnerSigner = verifyWinnerSign(winnerDetails);

        require(
            winnerDetails.winnerAddress == winnerSigner,
            "MarketPlace: winner sign verification failed"
        );

        // Mint
        IERC721Mint instance = IERC721Mint(sellerDetails.assetAddress);
        require(
            instance.isApprovedForAll(sellerDetails.seller, address(this)),
            "MarketPlace: address not approve"
        );
        uint256 tokenId = sellerDetails.tokenId;
        if (tokenId == 0) {
            tokenId = instance.mint(
                sellerDetails.seller,
                sellerDetails.tokenUri,
                sellerDetails.royality
            );
        }

        instance.transferFrom(
            sellerDetails.seller,
            winnerDetails.winnerAddress,
            tokenId
        );

        // FundTranfer
        IERC20 instanceERC20 = IERC20(sellerDetails.paymentAssetAddress);

        require(
            instanceERC20.balanceOf(winnerDetails.winnerAddress) >=
                winnerDetails.amount,
            "MarketPlace: Insuficent fund"
        );

        require(
            instanceERC20.allowance(msg.sender, address(this)) >=
                sellerDetails.amount,
            "MarketPlace: Check the token allowance."
        );

        // platformfee/ServiceFee
        uint256 platFormFee = (winnerDetails.amount.mul(platFormFeePercent))
            .div(10000);

        instanceERC20.transferFrom(
            winnerDetails.winnerAddress,
            address(this),
            platFormFee
        );

        (address receiver, uint256 royaltyAmount) = instance.royaltyInfo(
            tokenId,
            winnerDetails.amount
        );
        uint256 remaining_amount = winnerDetails.amount;
        address handleStackDeepSeller = sellerDetails.seller;
        if (royaltyAmount > 0) {
            if (sellerDetails.seller != receiver) {
                instanceERC20.transferFrom(
                    winnerDetails.winnerAddress,
                    receiver,
                    royaltyAmount
                );
                remaining_amount -= royaltyAmount;
            }
        }
        remaining_amount -= platFormFee;

        instanceERC20.transferFrom(
            winnerDetails.winnerAddress,
            handleStackDeepSeller,
            remaining_amount
        );

        isNonceProcessed[sellerDetails.nonce] = true;

        emit lazy_Auction(
            sellerDetails.tokenId,
            sellerDetails.assetAddress,
            sellerDetails.amount,
            winnerDetails.winnerAddress,
            handleStackDeepSeller
        );
        emit lazy_Auction_duration(
            sellerDetails.startTime,
            sellerDetails.endTime
        );
    }

    function getSigner(bytes32 hash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return
            ecrecover(
                keccak256(
                    abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
                ),
                v,
                r,
                s
            );
    }

    function verifySellerSign(SellerDetails calldata sellerDetails)
        public
        pure
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                sellerDetails.assetAddress,
                sellerDetails.tokenId,
                sellerDetails.tokenUri,
                sellerDetails.paymentAssetAddress,
                sellerDetails.amount,
                sellerDetails.nonce
            )
        );
        return getSigner(hash, sellerDetails.seller_signature);
    }

    function verifyWinnerSign(WinnerDetails calldata winnerDetails)
        public
        pure
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                winnerDetails.winnerAddress,
                winnerDetails.amount,
                winnerDetails.bidTime,
                winnerDetails.nonce
            )
        );
        return getSigner(hash, winnerDetails.winnerSignature);
    }

    /**
     *@dev Method to split the seller signature.
     *@param sig: Name of _signature is used to generate the signer.
     */
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "MarketPlace: invalid signature length.");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    /// Fallback function must be declared as external.
    fallback() external payable {}

    receive() external payable {}
}
