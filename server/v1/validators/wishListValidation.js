const Joi = require('joi');
const CONFIG = require('../../utils/appConfig')
const addWishList = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.number().required(),
    data: Joi.string().required()
})
module.exports = {
    addWishList: (req, res, next) => {
        const { error } = addWishList.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    }
}
