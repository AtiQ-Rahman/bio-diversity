const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.getAllSpecies = async (req, res, next) => {
    let modifiedList = []
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])
        let searchQuery = `select * from ${table} where marker is not null`
        let response = await executeQuery(searchQuery)
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
                else{
                    if(item.district.includes('{'))
                        districts = item?.district ? JSON.parse(item.district) : []
                    else
                        districts = [] || []
                }
                modifiedResponse.push({
                    ...item,
                    identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                    additionalFiles: item?.additional_files?.split(',') || '',
                    name: item?.name ? JSON.parse(item.name) : {},
                    districts: districts,

                })
            }
            modifiedList = modifiedList.concat(modifiedResponse)
        }
    }

    console.log(modifiedList.length)
    res.status(200).json({
        success: true,
        data: modifiedList,
    })



}