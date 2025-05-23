const razorpay = require('../razorpayConfig'); // Import Razorpay configuration
const Models = require('../models')
const paymentModel = Models.payments

const paymentService = {
    async createOrder(amount, currency, userId, productId) {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
            receipt: `receipt_order_${Math.random() * 1000}`, // Generate a random receipt ID,
            payment_capture: 1
        };

        // Create order in Razorpay
        const order = await razorpay.orders.create(options);
        const obj = {
            product_id: productId,
            payment_amount: amount,
            userId: userId
        }

        return {
            razor_order_id: order.id,
            data: await paymentModel.create(obj)
        }
    },
    async verifyPayment(amount, paymentId, currency) {
        return await razorpay.payments.capture(paymentId, amount * 100, currency)
    },
    async updatePaymentStatus(orderId, status) {
        return await paymentModel.update({ status: status }, { where: { payment_id: orderId } })
    },
    async refundPayment(paymentId, amount) {
        const options = {
            payment_id: paymentId,
        };

        return await razorpay.payments.refund(paymentId, {
            amount: amount * 100
        });
    }
};

module.exports = paymentService;
