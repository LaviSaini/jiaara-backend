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
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
};

//get cart list
exports.getCartList = async (req, res) => {
    const { userId } = req.params;
    try {
        let list = await cartService.getItemList(userId);
        const allProductIds = list.map(data => data.product_id);
        const productMeta = await cartService.getMetaData(allProductIds);
        const newList = list.map((element) => {
            const inStockDetail = productMeta.find(data => data.post_id === element.product_id && data.meta_key == '_stock_status');
            const obj = {
                "user_id": element?.user_id,
                "cart_id": element?.cart_id,
                "created_date": element?.created_date,
                "product_id": element?.product_id,
                "quantity": element?.quantity,
                "img": element?.img,
                "price": element?.price,
                "name": element?.name,
                "status": element?.status,
                // "inStock": false
                "inStock": inStockDetail.meta_value == 'instock' ? true : false
            }
            return obj;
        })
        // return res.success(CONFIG.SUCCESS_CODE, CONFIG.CART_LIST, newList)
        if (newList.length === 0) {
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_CART, [])
        }
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.CART_LIST, newList)
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
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
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
};



exports.clearCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartClear = await cartService.clearCart(userId);
        if (cartClear) {
            return res.success(CONFIG.SUCCESS_CODE, {})
        } else {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)

        }
    } catch (error) {
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR,)
    }
}
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
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
}
