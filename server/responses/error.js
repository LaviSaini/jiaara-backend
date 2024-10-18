module.exports = error = (req, res, next) => {
    res.reject = function (code, message) {
        res.status(code).send({
            response: { success: false, message: message || '' },
        });
    };
    next();
};