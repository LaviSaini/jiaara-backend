const Models = require('../models')
const cartModel = Models.carts
const paymentModel = Models.payments;
const postMeta = Models.tqio_postmeta;
const { Op } = require('sequelize');
const cartService = {
    async addItem(userId, productId, quantity, img, price, name) {
        //finding item already exist for it or not
        const itemExist = await cartModel.findOne({ where: { user_id: userId, product_id: productId } })
        if (!itemExist) {
            return await cartModel.create({ user_id: userId, product_id: productId, quantity: quantity, img: img, price: price, name: name });
        } else {
            return await cartModel.update({ quantity: itemExist.quantity + quantity }, { where: { user_id: userId, product_id: productId } })
        }

    },

    async editItem(userId, productId, quantity) {
        const query = 'UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?';
        return new Promise((resolve, reject) => {
            cartModel.query(query, [quantity, userId, productId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    async itemExist(userId, productId) {
        return await cartModel.findOne({ where: { user_id: userId, product_id: productId } })
    },
    async deleteItem(userId, productId) {
        return await cartModel.destroy({ where: { user_id: userId, product_id: productId } })
    },
    async getItemList(userId) {
        return await cartModel.findAll({ where: { user_id: userId } })
    },
    async udpateOrderId(orderId, userId, paymentId) {
        return await paymentModel.update({ order_id: orderId }, { where: { payment_id: paymentId } })
    },
    async clearCart(userId) {
        return await cartModel.destroy({ where: { user_id: userId } })
    },
    async getMetaData(postId) {
        return await postMeta.findAll({ where: { post_id: { [Op.in]: postId } } })
    }
};

module.exports = cartService;
