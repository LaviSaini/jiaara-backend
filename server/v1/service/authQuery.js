const Models = require('../models')
const UserModel = Models.tqio_users
const UserMetaDataModel = Models.tqio_usermeta;
const OTP = Models.otp;
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
        const exists = await OTP.findOne({ where: { email: email } });
        if (exists) {
            return await OTP.update({ otp: otp }, { where: { email: email } })
        } else {
            return await OTP.create({ email: email, otp: otp });
        }
    }
    const removeOtp = async (email, otp) => {
        return await OTP.destroy({ where: { email: email } });
    }
    const getOtpByEmail = async (email) => {
        return await OTP.findOne({ where: { email: email } })
    }
    const saveMetaDataa = async (requestObject) => {
        return await UserMetaDataModel.create(requestObject)
    }
    return {
        getUserByEmail,
        createUser,
        updateUserPassword,
        saveotp,
        saveMetaDataa,
        getOtpByEmail,
        removeOtp
    }
}
module.exports = userService