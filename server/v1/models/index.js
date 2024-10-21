const Sequelize = require('sequelize');
const sequelize = require("../../connection/connect");
const normalizedPath = require("path").join(__dirname, 'models');
const models = {};
console.log('dfdf', normalizedPath)
require('fs').readdirSync(normalizedPath).forEach((file) => {
    if (file.indexOf('.js') >= 0) {
        models[file.replace('.js', '')] = require(`${normalizedPath}/${file}`)(sequelize, Sequelize);
    }
});
console.log(models)
module.exports = models