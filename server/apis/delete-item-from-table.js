const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, tableTypes } = require('../config/common');
const moment = require("moment/moment");

exports.deleteItemFromTable = async (req, res, next) => {
    let request = req.body
    let table = await getTable(request.data)
    let searchQuery = `SELECT * FROM ${table} where serial = '${request.serial}'`
    let response = await executeQuery(searchQuery)
    let parsedResponse = JSON.stringify(response[0])
    let deleteTable = await getTable(tableTypes.deletedSpecies)
    let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
    let insertQueryOnDeleteTable = `insert into ${deleteTable} (table_name , data , createdDatetimeStamp ) values('${table}' ,  '${parsedResponse}' , '${createdDatetimeStamp}')`
    let responseInsert = await executeQuery(insertQueryOnDeleteTable)
    let deleteQuery = `delete from ${table} where serial = '${request.serial}'`
    let response2 =  await executeQuery(deleteQuery)
    res.status(200).json({
        success: true,
        data: response2,
    })
}