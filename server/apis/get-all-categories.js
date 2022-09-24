const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetAllCategories = async (req, res, next) => {
    try{
        let table = getTable(tableTypes.categories)
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
    }
    catch(err){
        log(err)
    }
   
}