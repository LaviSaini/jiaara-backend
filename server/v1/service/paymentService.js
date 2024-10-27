const razorpay = require('../razorpayConfig'); // Import Razorpay configuration
const db = require('../db'); // Import database connection

const paymentService = {
    async createOrder(amount, currency, userId, productId) {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency,
            receipt: `receipt_order_${Math.random() * 1000}`, // Generate a random receipt ID
        };

        // Create order in Razorpay
        const order = await razorpay.orders.create(options);

        // Save order details to database
        const paymentData = {
            userId,
            productId,
            orderId: order.id,
            amount: amount,
            currency: currency,
            status: 'PENDING', // Default status
        };

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO payments SET ?', paymentData, (err, results) => {
                if (err) return reject(err);
                resolve({ order, results });
            });
        });
    },

    async refundPayment(paymentId) {
        const options = {
            payment_id: paymentId,
            amount: null, // Optional: Specify amount to refund
        };

        return await razorpay.payments.refund(options);
    }
};

module.exports = paymentService;
