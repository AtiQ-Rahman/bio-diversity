const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGSearchParamsByField = async (req, res, next) => {
    let searchParameters = req.body.searchParameters
    // console.log({searchParameters})
    let table = await getTable(searchParameters.category)
    let searchQuery = `select * from ${table}`
    if (searchParameters.type) {
        searchQuery += ` where JSON_EXTRACT(identificationFeatures, "$.subCategory.key") = '${searchParameters.type.key}'`
    }
    let response = await executeQuery(searchQuery)
    console.log(JSON.stringify(searchParameters.type))
    console.log(response)
    if (response?.length > 0) {
        let modifiedResponse = []
        for (let item of response) {
            modifiedResponse.push({
                ...item,
                identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                additionalFiles: item?.additionaL_files?.split(',') || '',
                name: item?.name ? JSON.parse(item.name) : {},
            })
        }
        res.status(200).json({
            success: true,
            data: modifiedResponse,
        })
    }



}