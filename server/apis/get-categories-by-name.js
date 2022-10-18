const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetCategoriesByName = async (req, res, next) => {
    let name = req.body.name
    let table = await getTable(tableTypes.categories)
    let searchQuery = `select * from ${table} where name = '${name}'`
    let response = await executeQuery(searchQuery)
    console.log({ searchQuery })
    if (response?.length > 0) {
        let categories = []
        for (let item of response) {
            let sub_table = await getTable(tableTypes.subcategories)
            let searchQuery = `select * from ${sub_table} where linkID = '${item.serial}'`
            let result = await executeQuery(searchQuery)
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