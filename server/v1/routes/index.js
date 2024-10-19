const express = require('express');
const route = express.Router();
route.use('/auth', require('./authRoutes'));
module.exports = route