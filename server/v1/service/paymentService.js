const razorpay = require('../razorpayConfig'); // Import Razorpay configuration
const Models = require('../models')
const paymentModel = Models.payments

const paymentService = {
    async createOrder(amount, currency, userId, orderId) {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
            receipt: `receipt_order_${Math.random() * 1000}`, // Generate a random receipt ID,
            payment_capture: 1
        };

        // Create order in Razorpay
        const order = await razorpay.orders.create(options);
        const obj = {
            order_id: orderId,
            payment_amount: amount,
        }

        return {
            razor_order_id: order.id,
            data: await paymentModel.create(obj)
        }
    },
    async verifyPayment(amount, paymentId, currency) {
        return await razorpay.payments.capture(paymentId, amount, currency)
    },
    async updatePaymentStatus(orderId, status) {
        return await paymentModel.update({ status: status }, { where: { order_id: orderId } })
    },
    async refundPayment(paymentId) {
        const options = {
            payment_id: paymentId,
        };
        return await razorpay.payments.refund(options);
    }
};

module.exports = paymentService;
