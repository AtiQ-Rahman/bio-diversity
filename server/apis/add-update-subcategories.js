const { getTable, executeQuery, uniqueIdGenerator, tableTypes } = require('../config/common');
const moment = require("moment/moment");
const DB = require("../config/connectToDatabase");

exports.addUpdateSubCategories = async (req, res, next) => {
    console.log(req.body)
    let table = await getTable(tableTypes.subcategories)
    let { name, key, serial } = req.body

    let searchQuery = `select * from ${table} where id = ${key}`
    // let response = await executeQuery(searchQuery)
    let response = await executeQuery(searchQuery)
    console.log({ response, searchQuery })
    if (response?.length > 0) {
        let modifiedDatetime = moment().format("YYYY-MM-DD HH:mm:ss");
        let updateQuery = `update ${table} set name = '${name}' , lastModified = '${modifiedDatetime}' where id = ${response[0].id}`
        await executeQuery(updateQuery)
        res.status(200).json({
            success: true,
            data: "Updated",
        })
    }
    else {
        let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
        let linkID = serial
        let insertQuery = `insert into ${table} 
            (name, linkID, createdDatetimeStamp)
            VALUES('${name}','${linkID}','${createdDatetimeStamp}')`
        let response = await executeQuery(insertQuery)
        console.log(response)
        res.status(200).json({
            success: true,
            data: "Inserted",
        })
    }

}
exports.deleteSubCategories = async (req, res, next) => {
    console.log(req.body)
    let table = await getTable(tableTypes.subcategories)
    let { values } = req.body

    let searchQuery = `select * from ${table} where id = ${values.key}`
    // let response = await executeQuery(searchQuery)
    let response = await executeQuery(searchQuery)
    console.log({ response, searchQuery })
    if (response?.length > 0) {
        let modifiedDatetime = moment().format("YYYY-MM-DD HH:mm:ss");
        let deleteQuery = `delete from ${table} where id = '${values.key}'`
        await executeQuery(deleteQuery)
        res.status(200).json({
            success: true,
            data: "Deleted",
        })
    }

}