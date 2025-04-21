const Joi = require('joi');
const CONFIG = require("../../utils/appConfig")
const createOrder = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().allow(null),
    userId: Joi.number().allow(null),
    productId: Joi.array().required()
})
const verifyPayment = Joi.object({
    amount: Joi.number().required(),
    payment_order_Id: Joi.string().required(),
    currency: Joi.string().allow(null),
    customPaymentId: Joi.number().required()
})
const refundPayment = Joi.object({
    paymentId: Joi.string().required(),
    amount: Joi.number().required()
})
const contactUs = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().allow(null, ''),
    message: Joi.string().required()
})
module.exports = {
    createOrder: (req, res, next) => {
        const { error } = createOrder.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    },
    verifyPayment: (req, res, next) => {
        const { error } = verifyPayment.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    },
    refundPayment: (req, res, next) => {
        const { error } = refundPayment.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    },
    contactUs: (req, res, next) => {
        const { error } = contactUs.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    }
}