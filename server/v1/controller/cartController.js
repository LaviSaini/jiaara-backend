const cartService = require('../service/cartServices');
const orderService = require('../service/orderService');
const CONFIG = require('../../utils/appConfig');
const { custom } = require('joi');
const formatDate = require('../../utils/formatDate');

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
exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log(orderId)
        const orderData = await orderService.getOrderData(orderId);

        const orderAddress = await orderService.getOrderAddress(orderId);
        let resObj = {
            orderDetails: {},
            customerDetails: {},
            products: [],
        }
        const obj1 = {
            orderNumber: orderId,
            date: formatDate(orderData.date_created_gmt),
            paymentMethos: orderData.payment_method_title
        }
        resObj.orderDetails = obj1;
        const addObj = orderAddress.find(data => data.address_type == 'billing');
        const obj2 = {
            email: addObj.email,
            phone: addObj.phone,
            billingAddress: addObj
        }
        resObj.customerDetails = obj2;
        const productLookUpDetail = await orderService.getProductLookUpData(orderId);
        const productIds = productLookUpDetail.map(element => element.product_id);
        const productDetail = await orderService.getPostData(productIds);
        const productMetaDetail = await orderService.getPostMetaData(productIds);
        const thumbnailIds = productMetaDetail.filter(data => data.meta_key == '_thumbnail_id');
        const salesPrice = productMetaDetail.filter(data => data.meta_key == '_sale_price');
        const thumbnailDetails = await orderService.getPostData(thumbnailIds.map(element => element.meta_value));
        let arr = [];
        productDetail.forEach((element) => {
            const thumbailId = thumbnailIds.find(data => data.post_id == element.ID)?.meta_value;
            const quantity = productLookUpDetail.find(data => data.product_id == element.ID)?.product_qty;
            const price = salesPrice.find(data => data.post_id == element.ID)?.meta_value;
            let obj = {
                id: element.ID,
                title: element.post_title,
                quantity: quantity,
                shippingAmount: productLookUpDetail.find(data => data.product_id == element.ID)?.shipping_amount,
                price: price,
                total: price * quantity,
                image: thumbnailDetails.find(data => data.ID == thumbailId)?.guid
            }
            arr.push(obj)
        })
        resObj.products = arr
        // return res.status(200).json({ data: resObj, data1: productDetail, data2: thumbnailIds, data3: thumbnailDetails, data4: productLookUpDetail, data5: arr })
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.SUCCESS, resObj)
    } catch (error) {
        console.log(error)
        return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
    }
}