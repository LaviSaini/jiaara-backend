const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const { createOrder, refundPayment, verifyPayment } = require('../validators/paymentValidators');


router.post('/create-order', createOrder, paymentController.createOrder);
router.post('/verify-payment', verifyPayment, paymentController.verifyPayment)
router.post('/refund', refundPayment, paymentController.refundPayment);

module.exports = router;
