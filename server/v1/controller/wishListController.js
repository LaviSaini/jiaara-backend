const wishListSevice = require('../service/wishlistService')
const CONFIG = require('../../utils/appConfig')
const wishListController = {
    async addWishList(req, res) {
        try {
            const body = req.body;
            const wishListAdded = await wishListSevice.addWishList(body);
            if (wishListAdded) {
                return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_ADDED_TO_WISHLIST)
            } else {
                return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
            }
        } catch (error) {
            console.log(error)
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }
    },
    async getWishList(req, res) {
        const { userId } = req.params;
        try {
            const list = await wishListSevice.getWishList(userId);
            if (list.length === 0) {
                return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_WISHLIST, [])
            }
            return res.success(CONFIG.SUCCESS_CODE, CONFIG.WISH_LIST, list)
        } catch (error) {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
        }
    },
    async deleteWishListItem(req, res) {
        const { userId, productId } = req.body;
        try {
            const dataExists = await wishListSevice.itemExist(userId, productId);
            if (dataExists) {
                const results = await wishListSevice.deleteItem(userId, productId);
                if (results) {
                    return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_REMOVED_FROM_WISHLIST)
                } else {
                    return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
                }

            } else {
                return res.success(CONFIG.SUCCESS_CODE, CONFIG.ITEM_NOT_FOUND_IN_WISHLIST)
            }
        } catch (error) {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
        }
    },
    async deleteAllWishlist(req, res) {
        try {
            const userId = req.params.userId;
            console.log(userId)
            const itemDeleted = await wishListSevice.deleteAllItem(userId);
            if (itemDeleted) {
                return res.success(CONFIG.SUCCESS_CODE, CONFIG.ALL_ITEM_DELETED)
            } else {
                return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
            }
        } catch (error) {
            return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR)
        }
    }
}
module.exports = wishListController