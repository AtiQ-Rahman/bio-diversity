const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies, isValidImageOrMarker } = require('../config/common');

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
        console.log(JSON.stringify(searchParameters.type))
        console.log({ response })
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                let districts = []
                if (item.district.includes('+')) {
                    let splittedValue = item.district.split('+')
                    splittedValue.map((item) => {
                        districts.push({
                            place_name: item,
                            center: null
                        })
                    })
                }
                else {
                    if (item.district.includes('{'))
                        districts = item?.district ? JSON.parse(item.district) : []
                    else
                        districts = item?.district || []
                }
                let additional_files = item?.additional_files?.split(',') || []
                additional_files = additional_files.filter((item) => {
                    if (isValidImageOrMarker(item)) {
                        return item
                    }
                })
                modifiedResponse.push({
                    ...item,
                    identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                    addtionalCategories: item?.addtionalCategories ? [JSON.parse(item.addtionalCategories)] : [],
                    additionalFiles: additional_files,
                    name: item?.name ? JSON.parse(item.name) : {},
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