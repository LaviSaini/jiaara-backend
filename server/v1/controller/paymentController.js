const paymentService = require('../service/paymentService');

exports.createOrder = async (req, res) => {
    const { amount, currency, userId, productId } = req.body;

    try {
        const { order, results } = await paymentService.createOrder(amount, currency, userId, productId);
        res.json({ order, dbResult: results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.refundPayment = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const refund = await paymentService.refundPayment(paymentId);
        res.json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
