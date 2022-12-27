const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, returnValidJson, isValidImageOrMarker, callGeocoderApi } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.getAllSpecies = async (req, res, next) => {
    let modifiedList = []
    let isFilterDistrict = req.body?.filterDistrict
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])
        let searchQuery = `select * from ${table} where marker is not null and species != '' and species !='undefined' ${isFilterDistrict ? "and district != '[]' and district !='[[]]' " : ''}`
        let response = await executeQuery(searchQuery)
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                let districts = []
                if (item.district.includes('{'))
                    districts = item?.district ? JSON.parse(item.district) : []
                else
                    districts = item?.district || []

                let identificationFeatures = await returnValidJson(item.identificationFeatures)
                let additional_files = item?.additional_files?.split(',') || []
                let profile_image = isValidImageOrMarker(item.profile_image) ? item.profile_image : null
                additional_files = additional_files.filter((item) => {
                    if (isValidImageOrMarker(item)) {
                        return item
                    }
                })

                modifiedResponse.push({
                    ...item,
                    profile_image,
                    identificationFeatures: identificationFeatures,
                    additionalFiles: additional_files,
                    districts: districts,

                })
            }
            modifiedList = modifiedList.concat(modifiedResponse)
        }
    }

    modifiedList = modifiedList.sort((a, b) => {
        if (a.createdDatetimeStamp > b.createdDatetimeStamp) return -1;
        if (a.createdDatetimeStamp < b.createdDatetimeStamp) return 1;
        return 0;
    });
    res.status(200).json({
        success: true,
        data: modifiedList,
    })



}