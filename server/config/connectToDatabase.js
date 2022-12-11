var mysql = require('mysql2/promise');
const dotenv = require("dotenv");
const { mode } = require('../../utils/callApi');
let DB
dotenv.config()
if (mode == 'production') {
    DB = mysql.createPool(process.env.DATABASE_URL)
}
else {
    DB = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: true
    });
}

module.exports = DB