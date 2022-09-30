const { getTable, executeQuery, uniqueIdGenerator } = require('../config/common');
const DB = require("../config/connectToDatabase");
const moment = require("moment/moment");

exports.createNewSpecies = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let speciesData = JSON.parse(req.body.data)
        let fileNameOnServer = []
        let files = req.files
        Promise.all(files.map((file) => {
            fileNameOnServer.push(file.filename)
        })
        ).then(async () => {
            let table = getTable(speciesData.category.name)

            let { serial,
                kingdom, phylum, classes, order, family, genus, nameOfSpecies, subSpecies, variety, subVariety, clone, forma, species,
                identificationFeatures, thumbnailImage, lng, lat, marker, category } = speciesData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }

            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (serial, kingdom, phylum, class_name, category, order_name, family, genus, name, sub_species, variety, sub_variety, clone, forma, species, idenitificationFeatures, additional_files, profile_image, lng, lat,marker, createdDatetimeStamp)
                VALUES('${serial}','${kingdom}','${phylum}','${classes}','${category.name}','${order}','${family}','${genus}','${JSON.stringify(nameOfSpecies)}','${subSpecies}','${variety}','${subVariety}','${clone}','${forma}','${species}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${thumbnailImage}','${lng}','${lat}','${marker}','${createdDatetimeStamp}')`
            // console.log(insertQuery)
            let response = executeQuery(insertQuery)
            console.log(response.code)
            if (response.code == '404') {
                res.status(500).json({
                    success: false,
                    data: "Error",
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: response,
                })
            }

        })
    }
    catch (err) {
        console.log(err)
    }


}