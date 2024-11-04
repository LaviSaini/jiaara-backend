const paymentService = require('../service/paymentService');
const CONFIG = require('../../utils/appConfig')
exports.createOrder = async (req, res) => {
    const { amount, currency, userId, orderId } = req.body;
    try {
        const { razor_order_id, data } = await paymentService.createOrder(amount, currency, userId, orderId);
        if (razor_order_id) {
            const dataObj = {
                order_id: razor_order_id
            }
            res.success(CONFIG.SUCCESS_CODE, CONFIG.ORDER_CREATED_SUCCESSFULLY, dataObj)
        } else {
            res.reject(CONFIG.INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.verifyPayment = async (req, res) => {
    const { amount, paymentId, currency, orderId } = req.body;
    try {
        const isVerified = await paymentService.verifyPayment(amount, paymentId, currency);
        if (isVerified?.status == 'captured') {
            await paymentService.updatePaymentStatus(orderId, 'SUCCESSFUl')
            res.success(CONFIG.SUCCESS_CODE, CONFIG.PAYMENT_VERIFIED)
        } else if (isVerified?.status == 'failed') {
            await paymentService.updatePaymentStatus(orderId, 'FAILED')
            res.reject(CONFIG.ERROR_CODE_BAD_REQUEST, CONFIG.PAYMENT_FAILED)
        } else {
            res.reject(isVerified?.error_code, isVerified?.error_description)
        }
    } catch (error) {
        res.reject(error?.statusCode, error?.error?.description)
    }
}
exports.refundPayment = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const refund = await paymentService.refundPayment(paymentId);
        refund.then((result) => {
            if (result?.status == 'failed') {
                res.reject(CONFIG.INTERNAL_SERVER_ERROR, CONFIG.REFUND_FAILED)
            } else if (result?.status == 'processed') {
                res.success(CONFIG.SUCCESS_CODE, CONFIG.REFUND_INITIATED)
            } else if (result?.status == 'pending') {
                res.success(CONFIG.SUCCESS_CODE, CONFIG.REFUND_IS_IN_PROGRESS)
            }
        })
    } catch (error) {
        res.reject(error.statusCode, error?.error?.description)
    }
};
