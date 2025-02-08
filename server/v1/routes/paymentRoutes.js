const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const { createOrder, refundPayment, verifyPayment, contactUs } = require('../validators/paymentValidators');


router.post('/create-order', createOrder, paymentController.createOrder);
router.post('/verify-payment', verifyPayment, paymentController.verifyPayment)
router.post('/refund', refundPayment, paymentController.refundPayment);
router.post('/send-mail', contactUs, paymentController.contactUs);
module.exports = router;
