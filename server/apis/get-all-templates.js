const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetAllTemplates = async (req, res, next) => {

    let table = await getTable(tableTypes.homepage)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    console.log({ response })
    if (response?.length > 0) {
        res.status(200).json({
            success: true,
            data: response,
        })
    }
    else {
        res.status(200).json({
            success: true,
            data: [],
        })
    }



}
exports.BIOGetGetSelectedTemplate = async (req, res, next) => {

    let table = await getTable(tableTypes.homepage)
    let searchQuery = `select * from ${table} where selected`
    let response = await executeQuery(searchQuery)
    console.log({ response })
    if (response?.length > 0) {
        res.status(200).json({
            success: true,
            data: response,
        })
    }
    else {
        res.status(200).json({
            success: true,
            data: [],
        })
    }



}