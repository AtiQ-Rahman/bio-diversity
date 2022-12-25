const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies, speciesTableTypes } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetAllCategories = async (req, res, next) => {

    let table = await getTable(tableTypes.categories)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) {
        let categories = []
        for (let item of response) {
            let sub_table = await getTable(tableTypes.subcategories)
            let itemTable = await getTable(item.name)
            let searchQuery = `select * from ${sub_table} where linkID = '${item.serial}'`
            let totalItemQuery = `SELECT COUNT(*) FROM ${itemTable} `
            let result = await executeQuery(searchQuery)
            let totalItemResults = await executeQuery(totalItemQuery)
            let subCategoryList = result.map((res)=>{
                return {
                    name : res.name,
                    key : res.id
                }
            })
            categories.push({
                name: item.name,
                serial: item.serial,
                type: item.type,
                keyList: subCategoryList,
                totalItem: totalItemResults[0]['COUNT(*)']
            })
        }
        res.status(200).json({
            success: true,
            data: categories,
        })
    }
    else {
        res.status(200).json({
            success: true,
            data: [],
        })
    }



}