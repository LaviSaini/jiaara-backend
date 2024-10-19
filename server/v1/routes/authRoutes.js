const express = require("express");
const router = express.Router();
const passport = require('passport')
const AuthController = require('../controller/authController')
// router.get('/google-login', AuthController.googleLogin)
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/api/v1/auth/success', failureRedirect: '/failure' }))
router.get('/success', AuthController.googleLoginSuccess)
router.get('/failure', AuthController.googleLoginFail)
module.exports = router