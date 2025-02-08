const express = require("express");
const router = express.Router();
const wishListController = require('../controller/wishListController');
const { addWishList } = require("../validators/wishListValidation");
router.post('/add-wishlist', addWishList, wishListController.addWishList)
router.post('/delete', wishListController.deleteWishListItem)
router.get('/get-wishlist/:userId', wishListController.getWishList)
router.delete('/delete-all-wishlist/:userId', wishListController.deleteAllWishlist)
module.exports = router