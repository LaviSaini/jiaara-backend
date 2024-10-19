
const authController = {
    async googleLoginSuccess(req, res) {
        const body = req.user;
        console.log(body)
    },
    async googleLoginFail(req, res) {
        console.log(req.user)
    },
}
module.exports = authController