const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const { addItem, deleteItem } = require('../validators/cartValidations');

// Define routes
router.post('/add-cart', addItem, cartController.addItem);    // Add item to cart
router.put('/edit-cart', cartController.editItem);     // Edit item quantity
router.delete('/delete-item', deleteItem, cartController.deleteItem); // Delete item from cart

module.exports = router;
