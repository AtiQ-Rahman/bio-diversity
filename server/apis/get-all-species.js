const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.getAllSpecies = async (req, res, next) => {
    let modifiedList = []
    Object.keys(speciesTableTypes).map(async (key, index) => {
        let table = await getTable(speciesTableTypes[key])
        let searchQuery = `select * from ${table} where marker is not null`
        let response = await executeQuery(searchQuery)
        // console.log({ response })
        if (response?.length > 0) {
            let modifiedResponse = []
            for (let item of response) {
                modifiedResponse.push({
                    ...item,
                    identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                    additionalFiles: item?.additionaL_files?.split(',') || '',
                    name: item?.name ? JSON.parse(item.name) : {},
                })
                if(response.length == modifiedResponse.length){
                    modifiedList = modifiedList.concat(modifiedResponse)
                }
            }
            if (Object.keys(speciesTableTypes).length - 1 == index) {
                console.log(modifiedList.length)

                res.status(200).json({
                    success: true,
                    data: modifiedList,
                })
            }
        }


    })


}