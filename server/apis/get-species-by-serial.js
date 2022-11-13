const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies, isValidImageOrMarker, returnValidJson, callGeocoderApi } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetSpeciesBySerial = async (req, res, next) => {
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
        let table = await getTable(searchParameters.category)
        let searchQuery = `select * from ${table} where serial = '${searchParameters.serial}'`

        let response = await executeQuery(searchQuery)
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                let districts = []
                if (item.district.includes('{'))
                    districts = item?.district ? JSON.parse(item.district) : []
                else
                    districts = item?.district || []
                let addtionalCategories = await returnValidJson(item.addtionalCategories)
                let identificationFeatures = await returnValidJson(item.identificationFeatures)
                let profile_image = isValidImageOrMarker(item.profile_image) ? item.profile_image : null
                let additional_files = item?.additional_files?.split(',') || []
                additional_files = additional_files.filter((item) => {
                    if (isValidImageOrMarker(item)) {
                        return item
                    }
                })
                modifiedResponse.push({
                    ...item,
                    profile_image,
                    identificationFeatures: identificationFeatures,
                    addtionalCategories: [addtionalCategories],
                    additionalFiles: additional_files,
                    districts: districts,

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