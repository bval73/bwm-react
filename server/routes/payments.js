const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const PaymentCtrl = require('../controllers/payment');

router.get('', UserCtrl.authMiddleWare, PaymentCtrl.getPendingPayments);

router.post('/accept', UserCtrl.authMiddleWare, PaymentCtrl.confirmPayment);
router.post('/decline', UserCtrl.authMiddleWare, PaymentCtrl.declinePayment);

module.exports = router;

