const cartService = require('../service/cartServices');
const CONFIG = require('../../utils/appConfig');
const { custom } = require('joi');
// Add item to cart
exports.addItem = async (req, res) => {
    const { userId, productId, quantity, img, price, name } = req.body;
    try {
        await cartService.addItem(userId, productId, quantity, img, price, name);
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_ADDED_TO_CART)
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message)
    }
};

//get cart list
exports.getCartList = async (req, res) => {
    const { userId } = req.params;
    try {
        const list = await cartService.getItemList(userId);
        if (list.length === 0) {
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_CART, [])
        }
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.CART_LIST, list)
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message)
    }
}

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
exports.finalOrder = async (req, res) => {
    const { userId, orderId, customPaymentId } = req.body;
    try {
        const orderIdUpdated = await cartService.udpateOrderId(orderId, userId, customPaymentId)
        if (orderIdUpdated) {
            const cartClear = await cartService.clearCart(userId);
            if (cartClear) {
                return res.success(CONFIG.SUCCESS_CODE, {})
            } else {
                return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)

            }
        } else {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message)
    }
}
