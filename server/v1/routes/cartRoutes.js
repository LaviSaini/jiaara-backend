const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const { addItem, deleteItem } = require('../validators/cartValidations');

// Define routes
router.post('/add-cart', addItem, cartController.addItem);    // Add item to cart
router.get('/get-cart-list/:userId', cartController.getCartList) //get cart items
router.post('/delete-item', deleteItem, cartController.deleteItem); // Delete item from cart
router.post('/final-order', cartController.finalOrder);
router.delete('/clear-cart/:userId', cartController.clearCart);
router.get('/get-order-details/:orderId', cartController.getOrderDetails)
module.exports = router;
