const { getTable, executeQuery, speciesTableTypes, isValidImageOrMarker } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.getAllImages = async (req, res, next) => {
    let modifiedList = []
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])
        let searchQuery = `select * from ${table} where marker is not null`
        let response = await executeQuery(searchQuery)
        if (response?.length > 0) {
            for (let item of response) {
                let files = item?.additional_files?.split(',') || []
                for (let imageItem of files) {
                    if (isValidImageOrMarker(imageItem)) {
                        modifiedList.push(imageItem)

                    }
                }
            }

        }
    }

    console.log(modifiedList.length)
    res.status(200).json({
        success: true,
        data: modifiedList,
    })



}