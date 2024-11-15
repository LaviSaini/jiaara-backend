const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const { addItem, deleteItem } = require('../validators/cartValidations');

// Define routes
router.post('/add-cart', addItem, cartController.addItem);    // Add item to cart
router.get('/get-cart-list/:userId', cartController.getCartList) //get cart items
router.delete('/delete-item', deleteItem, cartController.deleteItem); // Delete item from cart

module.exports = router;
