// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "contracts/interfaces/Iblacklist.sol";
import "contracts/interfaces/IERC721Mint.sol";

error InvalidProof();

contract MarketPlace is Initializable, OwnableUpgradeable {
    
    // Use OpenZeppelin's SafeMath library to prevent overflows.
    using SafeMathUpgradeable for uint256;
    
    uint256 public platFormFeePercent; // variable for platform fee.

    // Scale is the number of digits to the right of the decimal point in a number. 
    uint256 public constant decimalPrecision = 100;

    
    bytes32 public merkleRoot; // set merkleRoot
    
    IblackList private blacklist; // interface for blacklist

    // ============ Structs ============
    struct SellerDetails {
        
        uint256 nonce; // number(nonce) always used once 
        address sellerAddress;  // current owner and saller
        address nftAddress; // asset address
        address paymentAssetAddress; // The address that should receive funds once the NFT is sold.   
        uint256 tokenId; // TokenId specify to uniquely identify the NFT
        uint96 royality;  //The Value Royality
        uint256 amount; // The value of the current highest bid.
        bytes sellerSignature; // signed transaction to put on sale the NFT to a contract 
        string tokenUri; // URI could be an API call over HTTPS, an IPFS hash, or anything else unique
        uint256 startTime;  // Time that the auction should start,
        uint256 endTime; // Time that the auction should end,
    }

    struct WinnerDetails {
        
        address winnerAddress; // The address will be owner of NFT after auction win
        uint256 amount; // The value of the current highest bid.
        bytes winnerSignature; // signed transaction to buy the NFT 
        uint256 bidTime; // time that the winner bid on the NFT
        uint256 nonce; // number(nonce) always used once 
    }

    // ============ Events ============
    event lazy_buy(
        address seller,
        address buyer,
        address assetAddress,
        uint256 tokenId,
        uint256 nonce
    );

    event lazy_Auction(
        address sellerAddress,
        address winner,
        address nftAddress,
        uint256 tokenId,
        uint256 amount
    );

    event lazy_Auction_duration(
        uint256 startTime,
        uint256 endTime
    );

    // ============ mapping ============
    mapping(uint256 => bool) public isNonceProcessed; //mapping for nonce.

    // ============ initialization ============
    function initialize(IblackList _blacklistAddress) public initializer {
        __Ownable_init();
        platFormFeePercent = 250;
        blacklist = _blacklistAddress;
    }

    // ============ Set methods ============
    function setPlatFormFeePercent(uint256 _newPlatFormFeePercent)
        public
        onlyOwner
    {
        platFormFeePercent = _newPlatFormFeePercent;
    }

    function setMerkleRoot(bytes32 _root) public onlyOwner {
        merkleRoot = _root;
    }

    // ============ modifier ============
    modifier _CheckBalAllo(address _paymentAssetAddress, address _address, uint256 _amount){
        _CheckBalance(_paymentAssetAddress, _address, _amount);
        _;
        _TokenAllowance(_paymentAssetAddress, _address, _amount);
    }

    // ============ Custom Methods ============
    function _CalculatedPlatFormFee(address _paymentAssetAddress, address _address, uint256 _amount) internal view _CheckBalAllo(_paymentAssetAddress, _address, _amount) returns(uint256){
        uint256 feeOnPlatForm = (_amount).mul(platFormFeePercent).div(decimalPrecision).div(100);
        return feeOnPlatForm;
    }

    function _CheckBalance(address _paymentAssetAddress, address _address, uint256 _amount) internal view{
        require(
            IERC20(_paymentAssetAddress).balanceOf(_address) >= _amount,
            "MarketPlace: Insufficient Amount"
        );
    }

    function _TokenAllowance(address _paymentAssetAddress, address _address, uint256 _amount) internal view {
        require(
            IERC20(_paymentAssetAddress).allowance(_address, address(this)) >=
                _amount,
            "MarketPlace: Check the token allowance."
        );
    }

    function _isCollectionApproved(SellerDetails calldata seller) internal view {
        IERC721Mint instance = IERC721Mint(seller.nftAddress);
        require(instance.isApprovedForAll(seller.sellerAddress, address(this)) || instance.getApproved(seller.tokenId) == address(this),
        "MarketPlace: Collection must be approved."
    );
    }

    function _isWinnerAddress(address _winnerAddress) internal view returns(address){
        require( _winnerAddress == msg.sender, "incorrect address");
        return _winnerAddress;
    }

    function _isMinted(SellerDetails calldata seller) internal returns(uint256){
        uint256 tokenId;
        if (seller.tokenId != 0) {
            _isCollectionApproved(seller);
            tokenId = seller.tokenId;
        }else {
            tokenId = IERC721Mint(seller.nftAddress).mint(seller.sellerAddress,
                    seller.royality,
                    seller.tokenUri
                );
            _isCollectionApproved(seller);
        }
        return tokenId;
    }

    function CalculatedRoyality(SellerDetails calldata seller, uint256 _tokenId) internal view returns(address, uint256){
        return IERC2981(seller.nftAddress).royaltyInfo( _tokenId, seller.amount);
    }

   /**
     * @dev This function will use to mint NFT which have SellerDetails and signature genrated from frontend
     *@notice @notice This function will use to mint NFT which is created from frontend the redeemer redem this NFT by passing the required agrs
     *@param seller: the seller details provide all the necessary detail for the seller.
     */
    function LazyBuy(SellerDetails calldata seller, bytes32[] calldata _proof) external {
        require(blacklist._isPermitted(msg.sender), "MarketPlace: user is blacklisted");

        if (!MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(msg.sender)))) { 
          revert InvalidProof();
        }

        require(
            !isNonceProcessed[seller.nonce],
            "MarketPlace: nonce already process"
        );

        require(
            seller.sellerAddress ==  verifySellerSign(seller),
            "MarketPlace: sellerAddress sign verification failed"
        );

        uint256 tokenId = _isMinted(seller);
        IERC721Mint(seller.nftAddress).transferFrom(seller.sellerAddress, msg.sender , tokenId);

        // Fund Transfer
        IERC20 instance20 = IERC20(seller.paymentAssetAddress);
        uint256 remaining_amount = seller.amount;

        instance20.transferFrom(msg.sender, address(this), _CalculatedPlatFormFee(seller.paymentAssetAddress, seller.sellerAddress, seller.amount)); //transfer PlatformFee
        remaining_amount -= _CalculatedPlatFormFee(seller.paymentAssetAddress, seller.sellerAddress, seller.amount);

        (address receiver, uint256 royaltyAmount) = CalculatedRoyality(seller, tokenId);
        if (royaltyAmount > 0) {
            if (seller.sellerAddress != receiver) {
                instance20.transferFrom(msg.sender, receiver, royaltyAmount);
                remaining_amount -= royaltyAmount;
            }
        }

        instance20.transferFrom(msg.sender, seller.sellerAddress, remaining_amount);

        isNonceProcessed[seller.nonce] = true;
        
        emit lazy_buy(
            seller.sellerAddress,
            msg.sender,
            seller.paymentAssetAddress,
            tokenId,
            seller.nonce
        );
    }

    // ============ Create Auction ============
    /**
     * @dev This method allows authorised users to MINT/SELL the NFT through lazyAuction.
     * @notice This method allows authorised users to sell/buy NFT on MARKETPLACE
     * @param seller: Details of Seller.
     * @param winnerDetails: Details of Winner.
     */
    function lazyAuction(SellerDetails calldata seller,WinnerDetails calldata winnerDetails, bytes32[] calldata _proof) external {
        require(
            blacklist._isPermitted(msg.sender),
             "user is blacklisted"
        );

        if (!MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(msg.sender)))) { 
          revert InvalidProof();
        }

        require(!isNonceProcessed[seller.nonce], "MarketPlace: nonce already process" );

        require(
            seller.sellerAddress == verifySellerSign(seller),
            "MarketPlace: sellerAddress sign verification failed"
        );

        require(
            _isWinnerAddress(winnerDetails.winnerAddress) == verifyWinnerSign(winnerDetails),
            "MarketPlace: winner sign verification failed"
        );

        uint256 tokenId = _isMinted(seller);
        IERC721Mint(seller.nftAddress).transferFrom(seller.sellerAddress, winnerDetails.winnerAddress, tokenId);

        // after nft is bided succesfully nft amount transfer to auctionCreator
        IERC20 instanceERC20 = IERC20(seller.paymentAssetAddress);
        uint256 remaining_amount = winnerDetails.amount;

        instanceERC20.transferFrom( winnerDetails.winnerAddress, address(this), _CalculatedPlatFormFee(seller.paymentAssetAddress, winnerDetails.winnerAddress, seller.amount));
        remaining_amount -= _CalculatedPlatFormFee(seller.paymentAssetAddress, winnerDetails.winnerAddress, seller.amount);

        (address receiver, uint256 royaltyAmount) = CalculatedRoyality(seller, tokenId);
        if (royaltyAmount > 0) {
            if (seller.sellerAddress != receiver) {
                instanceERC20.transferFrom(
                    winnerDetails.winnerAddress,
                    receiver,
                    royaltyAmount
                );
                remaining_amount -= royaltyAmount;
            }
        }

        instanceERC20.transferFrom(
            winnerDetails.winnerAddress,
            seller.sellerAddress,
            remaining_amount
        );

        isNonceProcessed[seller.nonce] = true;

        emit lazy_Auction(seller.sellerAddress, winnerDetails.winnerAddress, seller.nftAddress, tokenId, seller.amount);
        emit lazy_Auction_duration(seller.startTime, seller.endTime);
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
     *@param seller: Details about seller of the NFT Auction.
     */
    function verifySellerSign(SellerDetails calldata seller)
        public
        pure
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                seller.nftAddress,
                seller.tokenId,
                seller.tokenUri,
                seller.paymentAssetAddress,
                seller.amount,
                seller.nonce
            )
        );
        return getSigner(hash, seller.sellerSignature);
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

    function withdrawToken(address _tokenContract, uint256 _amount) external onlyOwner {
        IERC20 tokenContract = IERC20(_tokenContract);
        tokenContract.approve(address(this), _amount);
        tokenContract.transferFrom(address(this), msg.sender, _amount);
    }

    /// Fallback function must be declared as external.
    fallback() external payable {}

    receive() external payable {}
    
}