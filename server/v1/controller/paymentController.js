const paymentService = require('../service/paymentService');
const CONFIG = require('../../utils/appConfig');
const contatUsTempate = require('../../utils/htmlTemplate/contactus');
const sendEmail = require('../../utils/nodemailer');
exports.createOrder = async (req, res) => {
    const { amount, currency, userId, productId } = req.body;
    try {
        const { razor_order_id, data } = await paymentService.createOrder(amount, currency, userId, productId);
        if (razor_order_id) {
            const dataObj = {
                order_id: razor_order_id,
                paymentId: data?.payment_id
            }
            res.success(CONFIG.SUCCESS_CODE, CONFIG.ORDER_CREATED_SUCCESSFULLY, dataObj)
        } else {
            res.reject(CONFIG.INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
};
exports.verifyPayment = async (req, res) => {
    const { amount, payment_order_Id, currency, customPaymentId } = req.body;
    try {
        const isVerified = await paymentService.verifyPayment(amount, payment_order_Id, currency);
        if (isVerified?.status == 'captured') {
            await paymentService.updatePaymentStatus(customPaymentId, 'SUCCESSFUL')
            res.success(CONFIG.SUCCESS_CODE, CONFIG.PAYMENT_VERIFIED)
        } else if (isVerified?.status == 'failed') {
            await paymentService.updatePaymentStatus(customPaymentId, 'FAILED')
            res.reject(CONFIG.ERROR_CODE_BAD_REQUEST, CONFIG.PAYMENT_FAILED)
        } else {
            res.reject(isVerified?.error_code, isVerified?.error_description)
        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
}
exports.refundPayment = async (req, res) => {
    const { paymentId, amount } = req.body;

    try {
        const refund = await paymentService.refundPayment(paymentId, amount);
        if (refund?.status == 'failed') {
            res.reject(CONFIG.INTERNAL_SERVER_ERROR, CONFIG.REFUND_FAILED)
        } else if (refund?.status == 'processed') {
            res.success(CONFIG.SUCCESS_CODE, CONFIG.REFUND_INITIATED)
        } else if (refund?.status == 'pending') {
            res.success(CONFIG.SUCCESS_CODE, CONFIG.REFUND_IS_IN_PROGRESS)
        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
};
exports.contactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;
        const htmlTemplate = contatUsTempate(firstName + ' ' + lastName, email, phone, message)
        const mailSent = await sendEmail(process.env.SENDER_EMAIL, 'Message For You', htmlTemplate);
        if (mailSent) {
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.CONTACT_EMAIL_SEND_SUCCESSFULLY);
        } else {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }

    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
}
