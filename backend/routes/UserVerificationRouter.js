const express = require('express');
const router = express.Router();

const UserVerificationController = require('../controllers/UserVerificationController');

router.post('/', UserVerificationController.create_user_verification);
router.get('/', UserVerificationController.get_user_verification);
router.delete('/:_id', UserVerificationController.delete_user_verification);
router.put('/:_id', UserVerificationController.update_user_verification);

module.exports = router;