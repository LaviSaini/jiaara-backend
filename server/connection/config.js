module.exports = {
    "production": {
        db_host: process.env.DB_HOST,
        user: process.env.DB_USER || '',
        password: process.env.PASSWORD || '',
        database: process.env.DB || '',
        db_port: process.env.DBPORT || '',
        dialect: process.env.DBDIALECT || '',
    },
    "development": {
        db_host: process.env.DB_HOST,
        user: process.env.DB_USER || '',
        password: process.env.PASSWORD || '',
        database: process.env.DB || '',
        db_port: process.env.DBPORT || '',
        dialect: process.env.DBDIALECT || '',    }
}
