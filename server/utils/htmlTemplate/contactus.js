function contatUsTempate(name, email, phone, message) {
    let str = `
        name:${name}<br>email:${email}<br>phone:${phone}<br>message:${message}
    `
    return str
}
module.exports = contatUsTempate