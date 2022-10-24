const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies, returnValidJson } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetSpeciesByCategory = async (req, res, next) => {
    let searchParameters = req.body.searchParameters
    // console.log({searchParameters})
    if (!searchParameters.category) {
        res.status(200).json({
            success: true,
            data: []
        })
    }
    else {
        console.log(searchParameters.category)
        let table = await getTable(searchParameters.category)
        let searchQuery = `select * from ${table}`

        let response = await executeQuery(searchQuery)
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                let addtionalCategories = returnValidJson(item.addtionalCategories)
                let identificationFeatures = returnValidJson(item.identificationFeatures)
                let name = returnValidJson(item.name)
                modifiedResponse.push({
                    ...item,
                    identificationFeatures: identificationFeatures,
                    addtionalCategories: addtionalCategories,
                    additionalFiles: item?.additional_files?.split(',') || '',
                    name: name,
                })
            }
            res.status(200).json({
                success: true,
                data: modifiedResponse,
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: []
            })
        }
    }


}