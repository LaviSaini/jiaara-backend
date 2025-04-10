
const { Op } = require('sequelize');
const Models = require('../models')
const orders = Models.tqio_wc_orders
const orderAddress = Models.tqio_wc_order_addresses;
const postMeta = Models.tqio_postmeta;
const post = Models.tqio_posts;
const orderProductLoolUp = Models.tqio_wc_order_product_lookup;
const paymentService = {
    async getOrderData(orderId) {
        return await orders.findOne({ where: { id: orderId } })
    },
    async getOrderAddress(orderId) {
        return await orderAddress.findAll({ where: { order_id: orderId } })
    },
    async getPostMetaData(postId) {
        return await postMeta.findAll({ where: { post_id: postId } })
    },
    async getProductLookUpData(orderId) {
        console.log("HELO", orderId)
        return await orderProductLoolUp.findAll({ where: { order_id: orderId } });
    },
    async getPostData(postId) {
        return await post.findAll({ where: { ID: { [Op.in]: postId } } })
    },
    async getPostMetaData(postId) {
        return await postMeta.findAll({ where: { post_id: { [Op.in]: postId } } })
    }
};

module.exports = paymentService;
