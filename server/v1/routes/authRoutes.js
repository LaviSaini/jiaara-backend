const express = require("express");
const router = express.Router();
const passport = require('passport')
const AuthController = require('../controller/authController');
const { userSignUp, userLogin, resetPassword, sendResetPasswordMail, forgotPassword } = require("../validators/userValidation");
// router.get('/google-login', AuthController.googleLogin)
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/api/v1/auth/success', failureRedirect: '/failure' }))
router.get('/success', AuthController.googleLoginSuccess)
router.get('/failure', AuthController.googleLoginFail)
router.post('/signUp', userSignUp, AuthController.signUp)
router.post('/login', userLogin, AuthController.login)
router.post('/reset-password', resetPassword, AuthController.resetPassword)
router.post('/send-reset-password-mail', sendResetPasswordMail, AuthController.sendResetPasswordEmail)
router.post('/forget-password', forgotPassword, AuthController.forgotPassword)
module.exports = router