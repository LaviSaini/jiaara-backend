const cartService = require('../service/cartServices');
const CONFIG = require('../../utils/appConfig')
// Add item to cart
exports.addItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await cartService.addItem(userId, productId, quantity);
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_ADDED_TO_CART)
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message)
    }
};

// Edit item quantity in cart
exports.editItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const results = await cartService.editItem(userId, productId, quantity);
        if (results.affectedRows === 0) {
            // return res.status(404).json({ message: 'Item not found in cart' });
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_CART)
        }
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_QUANTITY_UPDATED)
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message);
    }
};

// Delete item from cart
exports.deleteItem = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const dataExists = await cartService.itemExist(userId, productId);
        if (dataExists) {
            const results = await cartService.deleteItem(userId, productId);
            if (results) {
                return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_REMOVED_FROM_CART)
            } else {
                return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
            }

        } else {
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_CART)
        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message);
    }
};
