
const mysql = require('mysql2');
// const mongoose = require('mongoose');

// MySQL connection
const MYSQLConnection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    // port: 3306
});

// Connect to MySQL
MYSQLConnection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
    } else {
        console.log('Connected to MySQL');
    }
});
module.exports = MYSQLConnection


