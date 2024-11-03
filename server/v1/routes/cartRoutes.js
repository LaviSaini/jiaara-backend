const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

// Define routes
router.post('/add-cart', cartController.addItem);    // Add item to cart
router.put('/edit-cart', cartController.editItem);     // Edit item quantity
router.delete('/delete-item', cartController.deleteItem); // Delete item from cart

module.exports = router;
