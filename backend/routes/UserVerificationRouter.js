const express = require('express');
const router = express.Router();

const UserVerificationController = require('../controllers/UserVerificationController');

router.post('/', UserVerificationController.create_user_verification);
router.get('/', UserVerificationController.get_user_verification);
// router.get('/signature', UserVerificationController.get_user_verification);
router.delete('/:_id', UserVerificationController.delete_user_verification);
router.put('/:_id', UserVerificationController.update_user_verification);

module.exports = router;


// Sign  0xc1977b761f1dd36c29795783460d241885c8e7f9d962dbe7bba2753fd94e89b444a1cd9ed855dd09afa3b73f7c2bd097ec9abc2d2775d737505a02d3f0cafa591b 
// Nonce 1 
// Signer 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266