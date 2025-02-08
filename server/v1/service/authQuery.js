const Models = require('../models')
const UserModel = Models.tqio_users
const UserMetaDataModel = Models.tqio_usermeta;
const userService = () => {
    const getUserByEmail = async (email) => {
        return await UserModel.findOne({ where: { user_email: email } })
    }
    const createUser = async (data) => {
        return await UserModel.create(data);
    }
    const updateUserPassword = async (password, email) => {
        return await UserModel.update({ password: password }, { where: { email: email } })
    }
    const saveotp = async (otp, email) => {
        return await UserModel.update({ otp: otp }, { where: { email: email } })
    }
    const saveMetaDataa = async (requestObject) => {
        return await UserMetaDataModel.create(requestObject)
    }
    return {
        getUserByEmail,
        createUser,
        updateUserPassword,
        saveotp,
        saveMetaDataa
    }
}
module.exports = userService