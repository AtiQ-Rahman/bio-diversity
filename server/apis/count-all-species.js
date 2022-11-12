const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, tableTypes } = require('../config/common');
const moment = require("moment/moment");

exports.countAllSpecies = async (req, res, next) => {

    let total = 0
    let totalAvailable = 0
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])

        let searchQuery = `select COUNT(id) as total from ${table}`
        let response = await executeQuery(searchQuery)
        totalAvailable += parseInt(response[0].total)
    }
    let requestSpeciestable = await getTable(tableTypes.requestedSpecies)

    let requestSpeciesQuery = `select COUNT(id) as total from ${requestSpeciestable}`
    let response = await executeQuery(requestSpeciesQuery)
    let totalRequestedSpecies = parseInt(response[0].total)
    total = totalAvailable + totalRequestedSpecies
    console.log({ total })

    res.status(200).json({
        success: true,
        data: {
            total,
            totalAvailable,
            totalRequestedSpecies
        },
    })

}