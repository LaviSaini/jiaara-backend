module.exports = {
    port: Number(process.env.PORT),

    db: {
        db_host: process.env.DB_HOST,
        user: process.env.DB_USER || '',
        password: process.env.PASSWORD || '',
        database: process.env.DB || '',
        db_port: process.env.DBPORT || '',
    },

}