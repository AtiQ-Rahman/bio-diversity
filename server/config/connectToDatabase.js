var mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config()
// const DB = mysql.createPool(process.env.DATABASE_URL)
const DB = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});
module.exports = DB