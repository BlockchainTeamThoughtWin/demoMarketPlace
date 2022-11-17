// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import  "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "contracts/mocks/interfaces/Iblacklist.sol";
import "contracts/mocks/interfaces/IERC721Mint.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract MarketPlace is Initializable, OwnableUpgradeable {
    // Use OpenZeppelin's SafeMath library to prevent overflows.
    using SafeMathUpgradeable for uint256;
    // variable for platform fee.
    uint256 public platFormFeePercent; 
    // Scale is the number of digits to the right of the decimal point in a number. 
    uint256 public constant decimalPrecision = 100;
    //set merkleRoot
    bytes32 public merkleRoot;
    // interface for blacklist
    IblackList blacklist;
    // ============ Structs ============
    struct SellerDetails {
        // number(nonce) always used once 
        uint256 nonce;
        // current owner and saller
        address sellerAddress;
        // asset address
        address nftAddress;
        // The address that should receive funds once the NFT is sold.
        address paymentAssetAddress;
        // TokenId specify to uniquely identify the NFT
        uint256 tokenId;
        //The Value Royality
        uint96 royality;
        // The value of the current highest bid.
        uint256 amount;
        // signed transaction to put on sale the NFT to a contract 
        bytes sellerSignature;
        // URI could be an API call over HTTPS, an IPFS hash, or anything else unique
        string tokenUri;
        // Time that the auction should start,
        uint256 startTime;
        // Time that the auction should end,
        uint256 endTime;
    }
        //Struct
    struct WinnerDetails {
        // The address will be owner of NFT after auction win
        address winnerAddress;
        // The value of the current highest bid.
        uint256 amount;
        // signed transaction to buy the NFT 
        bytes winnerSignature;
        // time that the winner bid on the NFT
        uint256 bidTime;
        // number(nonce) always used once 
        uint256 nonce;
    }
    // ============ Events ============
     // All of the details of auction,
    event lazybuy(
        uint256 nonce,
        address assetAddress,
        address seller,
        address buyer,
        uint256 tokenId
    );
    event lazy_Auction(
        uint256 tokenId,
        address nftAddress,
        uint256 amount,
        address winner,
        address sellerAddress
    );
    event lazy_Auction_duration(
        uint256 startTime, 
        uint256 endTime
    );
    // A mapping to check nonce processed or not.
    mapping(uint256 => bool) public isNonceProcessed; //mapping for nonce.
    // ============ initialization ============
    function initialize(IblackList _blacklistAddress) public initializer {
        __Ownable_init();
        platFormFeePercent = 250;
        blacklist = _blacklistAddress;
    }
    // ============ Set brokrage percent ============
    function setPlatFormFeePercent(uint256 _newPlatFormFeePercent)
        public
        onlyOwner
    {
        platFormFeePercent = _newPlatFormFeePercent;
    }
    function setMerkleRoot(bytes32 _root) public onlyOwner {
        merkleRoot = _root;
    }
    function _checkValidity(address _address, bytes32[] calldata _merkleProof) internal view returns (bool){
        bytes32 leafToCheck = keccak256(abi.encodePacked(_address));
        return MerkleProof.verify(_merkleProof, merkleRoot, leafToCheck);
    }
  
   /**
     * @dev This function will use to mint NFT which have SellerDetails and signature genrated from frontend
     *@notice @notice This function will use to mint NFT which is created from frontend the redeemer redem this NFT by passing the required agrs
     *@param seller: the seller details provide all the necessary detail for the seller.
     */
    function LazyBuy(SellerDetails calldata seller, bytes32[] calldata _proof) external {
        require(blacklist._isPermitted(msg.sender), "MarketPlace: user is blacklisted");
        require(_checkValidity(msg.sender, _proof), "ADDRESS_NOT_WHITELISTED");
        require(
            !isNonceProcessed[seller.nonce],
            "MarketPlace: nonce already process"
        );
        address buyer = payable(msg.sender);
        // make sure signature is valid and get the address of the signer
        address sellerSigner = verifySellerSign(seller);
        // make sure that the signer is authorized to mint NFTs
        require(
            seller.sellerAddress == sellerSigner,
            "MarketPlace: sellerAddress sign verification failed"
        );
        IERC721Mint instance = IERC721Mint(seller.nftAddress);
        uint256 tokenId ;
         if (seller.tokenId != 0) {
            require(
                instance.isApprovedForAll(
                    seller.sellerAddress,
                    address(this)
                ) || instance.getApproved(seller.tokenId) == address(this),
                "MarketPlace: Collection must be approved."
            );
        // transfer the token to the redeemer
            instance.transferFrom(seller.sellerAddress, buyer, seller.tokenId);
            tokenId = seller.tokenId;
        } else {
            tokenId = instance.mint(
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
        // transfer the token to the redeemer
        instance.transferFrom(seller.sellerAddress, buyer, tokenId);
        }
        //fund transfer
        IERC20 instance20 = IERC20(seller.paymentAssetAddress);
        // make sure that the redeemer is paying enough to cover the buyer's cost
        require(
            instance20.balanceOf(buyer) >= seller.amount,
            "MarketPlace: Insufficient Amount"
        );
        require(
            instance20.allowance(buyer, address(this)) >=
                seller.amount,
            "MarketPlace: Check the token allowance."
        );
        uint256 feeOnPlatForm = (seller.amount).mul(platFormFeePercent).div(decimalPrecision).div(100);
        instance20.transferFrom(buyer, address(this), feeOnPlatForm);
        IERC2981 RoyaltyInfo = IERC2981(seller.nftAddress);
        (address receiver, uint256 royaltyAmount) = RoyaltyInfo.royaltyInfo(
            tokenId,
            seller.amount
        );
        uint256 remaining_amount = seller.amount;
        if (royaltyAmount > 0) {
            if (seller.sellerAddress != receiver) {
                instance20.transferFrom(buyer, receiver, royaltyAmount);
                remaining_amount -= royaltyAmount;
            }
        }
        remaining_amount -= feeOnPlatForm;
        instance20.transferFrom(buyer, seller.sellerAddress, remaining_amount);
        /// nonce is ture
        isNonceProcessed[seller.nonce] = true;
        
        emit lazybuy(
            seller.nonce,
            seller.paymentAssetAddress,
            seller.sellerAddress,
            buyer,
            tokenId
        );
    }
    // ============ Create Auction ============
    /**
     * @dev This method allows authorised users to MINT/SELL the NFT through lazyAuction.
     * @notice This method allows authorised users to sell/buy NFT on MARKETPLACE
     * @param sellerDetails: Details of Seller.
     * @param winnerDetails: Details of Winner.
     */
    function lazyAuction(
        SellerDetails calldata sellerDetails,
        WinnerDetails calldata winnerDetails
    ) external {
        // check user or address whitlisted or blacklisted
        require(
            blacklist._isPermitted(msg.sender),
             "user is blacklisted"
        );
        // check nonce use once
        require(
            !isNonceProcessed[sellerDetails.nonce],
            "MarketPlace: nonce already process"
        );
        // check seller signature right or wrong
        address sellerSigner = verifySellerSign(sellerDetails);
        require(
            sellerDetails.sellerAddress == sellerSigner,
            "MarketPlace: sellerAddress sign verification failed"
        );
        // check winner signature right or wrong 
        address winnerSigner = verifyWinnerSign(winnerDetails);
        
        require(
            winnerDetails.winnerAddress == winnerSigner,
            "MarketPlace: winner sign verification failed"
        );
        // check user have nft mint access
        IERC721Mint instance = IERC721Mint(sellerDetails.nftAddress);
         uint256 tokenId ;
         if (sellerDetails.tokenId != 0) {
            require(
                instance.isApprovedForAll(
                    sellerDetails.sellerAddress,
                    address(this)
                ) || instance.getApproved(sellerDetails.tokenId) == address(this),
                "MarketPlace: Collection must be approved."
            );
        // transfer the token to the redeemer
            instance.transferFrom(sellerDetails.sellerAddress, winnerDetails.winnerAddress, sellerDetails.tokenId);
            tokenId = sellerDetails.tokenId;
        } else {
            tokenId = instance.mint(
                sellerDetails.sellerAddress,
                sellerDetails.royality,
                sellerDetails.tokenUri
            );
            require(
                instance.isApprovedForAll(
                    sellerDetails.sellerAddress,
                    address(this)
                ) || instance.getApproved(tokenId) == address(this),
                "MarketPlace: Collection must be approved."
            );
        instance.transferFrom(
            sellerDetails.sellerAddress,
            winnerDetails.winnerAddress,
            tokenId
        );
        }
        // after nft is bided succesfully nft amount transfer to auctionCreator
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
        // math for platformfee/brockrage/royalties
        uint256 platFormFee = (winnerDetails.amount.mul(platFormFeePercent))
            .div(10000);
        instanceERC20.transferFrom(
            winnerDetails.winnerAddress,
            address(this),
            platFormFee
        );
        // create royalty instrance to update royalty reciver and royalty amount
        IERC2981 RoyaltyInfo = IERC2981(sellerDetails.nftAddress);
        (address receiver, uint256 royaltyAmount) = RoyaltyInfo.royaltyInfo(
            tokenId,
            winnerDetails.amount
        );
        
        uint256 remaining_amount = winnerDetails.amount;
        address handleStackDeepSeller = sellerDetails.sellerAddress;
        if (royaltyAmount > 0) {
            if (sellerDetails.sellerAddress != receiver) {
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
            tokenId,
            sellerDetails.nftAddress,
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
    /**
     *@dev Method: is used to provide signer.
     *@param sellerDetails: Details about seller of the NFT Auction.
     */
    function verifySellerSign(SellerDetails calldata sellerDetails)
        public
        pure
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                sellerDetails.nftAddress,
                sellerDetails.tokenId,
                sellerDetails.tokenUri,
                sellerDetails.paymentAssetAddress,
                sellerDetails.amount,
                sellerDetails.nonce
            )
        );
        return getSigner(hash, sellerDetails.sellerSignature);
    }
    /**
     *@dev Method: is used to provide signer.
     *@param winnerDetails: Details about winner of the NFT Auction.
     */
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
     *@dev Method to split the sellerAddress signature.
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
