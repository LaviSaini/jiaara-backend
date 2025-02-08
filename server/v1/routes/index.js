const express = require('express');
const route = express.Router();
route.use('/auth', require('./authRoutes'));
route.use('/cart', require('./cartRoutes'));
route.use('/payment', require('./paymentRoutes'));
route.use('/wishlist', require('./wishListRoutes'))
module.exports = route