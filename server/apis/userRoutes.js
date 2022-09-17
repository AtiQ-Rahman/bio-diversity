
const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const speciesList = require("../files/speciesList")
const db = require('../config/connectToDatabase')
const getTable = require('../config/common')

// creat a admin
router.post("/get-species-list", async (req, res, next) => {
    console.log(speciesList)
    let table = getTable('species')
    let searchQuery = `select * from ${table}`
    db.query(searchQuery, (err, res) => {
        console.log('working')
    })
    res.status(200).json({
        success: true,
        data: speciesList,
    })
});
module.exports = router;
