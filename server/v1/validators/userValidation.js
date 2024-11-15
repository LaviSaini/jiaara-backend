const Joi = require('joi');
const CONFIG = require('../../utils/appConfig')
const userSignUp = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().allow('', null)
})
const userLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})
const resetPassword = Joi.object({
    email: Joi.string().required(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})
const sendResetPasswordMail = Joi.object({
    email: Joi.string().required()
})
const forgotPassword = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required()
})
const generateNewAccessToken = Joi.object({
    token: Joi.string().required()
})
const customGoogleLogin = Joi.object({
    token: Joi.string().required()
})
module.exports = {
    userSignUp: (req, res, next) => {
        const { error } = userSignUp.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    },
    userLogin: (req, res, next) => {
        const { error } = userLogin.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    },
    resetPassword: (req, res, next) => {
        const { error } = resetPassword.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    },
    sendResetPasswordMail: (req, res, next) => {
        const { error } = sendResetPasswordMail.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    },
    forgotPassword: (req, res, next) => {
        const { error } = forgotPassword.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    },
    generateNewAccessToken: (req, res, next) => {
        const { error } = generateNewAccessToken.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    },
    customGoogleLogin: (req, res, next) => {
        const { error } = customGoogleLogin.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next()
    }
}