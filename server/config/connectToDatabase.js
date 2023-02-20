var mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config()
const DB = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
});


module.exports = DB