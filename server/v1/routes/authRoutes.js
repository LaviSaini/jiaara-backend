const express = require("express");
const router = express.Router();
const AuthController = require('../controller/authController');
const { userSignUp, userLogin, resetPassword, sendResetPasswordMail, forgotPassword, generateNewAccessToken, customGoogleLogin } = require("../validators/userValidation");
router.post('/signUp', userSignUp, AuthController.signUp)
router.post('/login', userLogin, AuthController.login)
router.post('/reset-password', resetPassword, AuthController.resetPassword)
router.post('/send-reset-password-mail', sendResetPasswordMail, AuthController.sendResetPasswordEmail)
router.post('/forget-password', forgotPassword, AuthController.forgotPassword)
router.post('/generate-new-access-token', generateNewAccessToken, AuthController.generateNewAccessToken)
router.post('/google-login', customGoogleLogin, AuthController.customGoogleLogin)
module.exports = router