const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const ReviewCtrl = require('../controllers/review');

router.get('', UserCtrl.authMiddleWare, ReviewCtrl.getReviews);
router.post('', UserCtrl.authMiddleWare, ReviewCtrl.createReview);

module.exports = router;
