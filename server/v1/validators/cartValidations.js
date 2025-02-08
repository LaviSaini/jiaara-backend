const Joi = require('joi');
const CONFIG = require("../../utils/appConfig");
const addItem = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
    img: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required()
});
const deleteItem = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.number().required()
})
module.exports = {
    addItem: (req, res, next) => {
        const { error } = addItem.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    },
    deleteItem: (req, res, next) => {
        const { error } = deleteItem.validate(req.body);
        if (error) {
            return res.status(CONFIG.ERROR_CODE_BAD_REQUEST).json({ message: error.details[0].message })
        }
        next();
    }
}