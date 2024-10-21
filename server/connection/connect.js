const Sequelize = require('sequelize');

const isDev = process.env.NODE_ENV === 'development';
const configs = require(`./config`);
const configuration = isDev ? configs.development : configs.production;
console.log(`${isDev ? "Using Development Database" : "Using Production Database"}`)

let database;

console.info('NODE_ENV:', process.env.NODE_ENV || 'development');
switch (process.env.NODE_ENV || 'development') {
    default: database = new Sequelize(
        configuration.database,
        configuration.user,
        configuration.password, {
        host: configuration.db_host,
        port: configuration.db_port,
        dialect: configuration.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false
    },
    );
}
module.exports = database;