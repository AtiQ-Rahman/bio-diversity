const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetSpeciesByCategory = async (req, res, next) => {
    let searchParameters = req.body.searchParameters
    // console.log({searchParameters})
    console.log('response', JSON.stringify(searchParameters))
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
        console.log(JSON.stringify(searchParameters.type))
        console.log({ response })
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                modifiedResponse.push({
                    ...item,
                    identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                    addtionalCategories: item?.addtionalCategories ? JSON.parse(item.addtionalCategories) : {},
                    additionalFiles: item?.additional_files?.split(',') || '',
                    name: item?.name ? JSON.parse(item.name) : {},
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