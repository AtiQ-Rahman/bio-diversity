const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const { getTable, executeQuery } = require('../config/common');
let table = getTable('categories')
const uniqueIdGenerator = async () => {

    let randomString = ''
    let characterList = []
    for (let i = 0; i < 25; i++) {
        characterList.push(String.fromCharCode('a'.charCodeAt() + i))
    }
    for (let i = 0; i < 25; i++) {
        characterList.push(String.fromCharCode('A'.charCodeAt() + i))
    }
    for (let i = 0; i < 9; i++) {
        characterList.push(String.fromCharCode('0'.charCodeAt() + i))
    }

    let len = characterList.length
    var idx, item, i;
    for (item = i = 1; 1 <= 5 ? i <= 5 : i >= 5; item = 1 <= 5 ? ++i : --i) {
        idx = (Math.floor(Math.random() * 10000363)) % 10000019;
        idx %= len;
        randomString += characterList[idx];
    }
    let searchQuery = `select * from ${table} where serial = '${randomString}`
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) uniqueIdGenerator()

    else return randomString
}
const moment = require("moment/moment");
const DB = require("../config/connectToDatabase");
// creat a admin
router.post("/admin/new", async (req, res, next) => {
    console.log('working')
});
router.post("/get-categories-list", async (req, res, next) => {

    let searchQuery = `select * from ${table}`
    DB.query(searchQuery, (err, response) => {
        console.log(res)
        if (err) {
            res.status(500).json({
                success: false,
                data: err,
            })
        }
        else if (response?.length > 0) {
            console.log(response)

            let categories = []
            for (let item of response) {
                categories.push({
                    name: item.name,
                    serial: item.serial,
                    type: item.type,
                    keyList: JSON.parse(item.keyList),
                })
            }
            res.status(200).json({
                success: true,
                data: categories,
            })
        }
    })



});

router.post("/add-update-categories", async (req, res, next) => {
    console.log(req.body)

    let { name, type, keyList, serial } = req.body
    if (!serial) {
        serial = await uniqueIdGenerator()
    }
    let searchQuery = `select * from ${table} where serial = '${serial}`
    // let response = await executeQuery(searchQuery)
    DB.query(searchQuery, async (err, response) => {

        if (response?.length > 0) {
            let modifiedDatetime = moment().format("YYYY-MM-DD HH:mm:ss");
            let updateQuery = `update ${table} set name = '${name}', name = '${type}', name = '${keyList}', lastModified = '${modifiedDatetime}' where serial = ${response[0].serial}`
            await executeQuery(updateQuery)
            res.status(200).json({
                success: true,
                data: "Updated",
            })
        }
        else {
            keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
            (name, serial, type, keyList, createdDatetime)
            VALUES('${name}','${serial}','${type}','${keyList}','${createdDatetimeStamp}')`
            let response = await executeQuery(insertQuery)
            console.log(response)
            res.status(200).json({
                success: true,
                data: "Inserted",
            })
        }

    })

});
module.exports = router;
