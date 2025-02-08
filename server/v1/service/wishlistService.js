const Models = require('../models')
const wishlist = Models.wishlist
const wishListService = {
    async addWishList(requestObject) {
        return await wishlist.create({ user_id: requestObject?.userId, product_id: requestObject?.productId, data: requestObject?.data })
    },
    async deleteWishListItem(userId, productId) {
        return await wishlist.destroy({ where: { user_id: userId, product_id: productId } })
    },
    async getWishList(userId) {
        return await wishlist.findAll({ where: { user_id: userId } })
    },
    async itemExist(userId, productId) {
        return await wishlist.findOne({ where: { user_id: userId, product_id: productId } })
    },
    async deleteItem(userId, productId) {
        return await wishlist.destroy({ where: { user_id: userId, product_id: productId } })
    },
    async deleteAllItem(userId) {
        return await wishlist.destroy({ where: { user_id: userId } })
    }
}
module.exports = wishListService