const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');


router.post('/create-order', paymentController.createOrder);
router.post('/refund', paymentController.refundPayment);

module.exports = router;
