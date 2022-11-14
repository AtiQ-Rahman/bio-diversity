const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, tableTypes } = require('../config/common');
const moment = require("moment/moment");

exports.countAllSpecies = async (req, res, next) => {
    let totalSpeciesByDivisions = {
        dhaka: 0,
        chittagong: 0,
        barishal: 0,
        khulna: 0,
        rajshahi: 0,
        rangpur: 0,
        mymensingh: 0,
        sylhet: 0,
    }
    let totalAvailableImages = 0
    let totalAvailable = 0
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])

        let searchQuery = `select COUNT(id) as total from ${table}`
        let response = await executeQuery(searchQuery)
        totalAvailable += parseInt(response[0].total)


        let searchQueryForDistricts = `select district from ${table} where district is not null and district !='[]' and district !='N/A'`
        let responseDistricts = await executeQuery(searchQueryForDistricts)
        if (responseDistricts.length > 0) {
            for (let item of responseDistricts) {
                if (item.district.includes("{")) {
                    let districts = JSON.parse(item.district)
                    if (districts.length > 0) {
                        for (let district of districts) {
                            let splittedDistrict = district.place_name.split(",")
                            let divisionName = splittedDistrict[splittedDistrict.length - 2]
                            if (divisionName.match(/barishal/i)) {
                                totalSpeciesByDivisions.barishal += 1
                            }
                            else if (divisionName.match(/dhaka/i)) {
                                totalSpeciesByDivisions.dhaka += 1
                            }
                            else if (divisionName.match(/khulna/i)) {
                                totalSpeciesByDivisions.khulna += 1
                            }
                            else if (divisionName.match(/sylhet/i)) {
                                totalSpeciesByDivisions.sylhet += 1
                            }
                            else if (divisionName.match(/rajshahi/i)) {
                                totalSpeciesByDivisions.rajshahi += 1
                            }
                            else if (divisionName.match(/rangpur/i)) {
                                totalSpeciesByDivisions.rangpur += 1
                            }
                            else if (divisionName.match(/chittagong/i)) {
                                totalSpeciesByDivisions.chittagong += 1
                            }
                            else if (divisionName.match(/mymensingh/i)) {
                                totalSpeciesByDivisions.chittagong += 1
                            }
                        }
                    }

                }
            }
        }

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
            totalRequestedSpecies,
            totalSpeciesByDivisions
        },
    })

}