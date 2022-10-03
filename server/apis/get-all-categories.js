const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetAllCategories = async (req, res, next) => {

    let table = await getTable(tableTypes.categories)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    console.log({response})
    if (response?.length > 0) {
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
    else{
        res.status(200).json({
            success: true,
            data: [],
        })
    }



}