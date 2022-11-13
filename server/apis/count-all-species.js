const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, tableTypes } = require('../config/common');
const moment = require("moment/moment");

exports.countAllSpecies = async (req, res, next) => {

    let totalAvailableImages = 0
    let totalAvailable = 0
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])

        let searchQuery = `select COUNT(id) as total from ${table}`
        let response = await executeQuery(searchQuery)
        totalAvailable += parseInt(response[0].total)

        let searchImages = `select additional_files from ${table} where additional_files is not NULL and upper(additional_files) != upper('N/A') and additional_files != ''`
        let responseImages = await executeQuery(searchImages)
        if (responseImages.length > 0) {
            for (let item of responseImages) {
                let splittedItem = item.additional_files.split(",")
                totalAvailableImages += splittedItem.length
            }
        }

    }
    let requestSpeciestable = await getTable(tableTypes.requestedSpecies)

    let requestSpeciesQuery = `select COUNT(id) as total from ${requestSpeciestable}`
    let response = await executeQuery(requestSpeciesQuery)
    let totalRequestedSpecies = parseInt(response[0].total)

    res.status(200).json({
        success: true,
        data: {
            totalAvailableImages,
            totalAvailable,
            totalRequestedSpecies
        },
    })

}