const Models = require('../models')
const UserModel = Models.users
const userService = () => {
    const getUserByEmail = async (email) => {
        return await UserModel.findOne({ where: { email: email } })
    }
    const createUser = async (data) => {
        return await UserModel.create(data);
    }
    const updateUserPassword = async (password, email) => {
        return await UserModel.update({ password: password }, { where: { email: email } })
    }
    return {
        getUserByEmail,
        createUser,
        updateUserPassword
    }
}
module.exports = userService