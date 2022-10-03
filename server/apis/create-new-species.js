const { getTable, executeQuery, uniqueIdGenerator, log } = require('../config/common');
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
            let table = await getTable(speciesData.category.name)

            let { serial,
                kingdom, phylum, classes, order, family, genus, nameOfSpecies, subSpecies, variety, subVariety, clone, forma, species,
                identificationFeatures, thumbnailImage, lng, lat, marker, category, profileIndex, addtionalCategories } = speciesData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }

            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (serial, kingdom, phylum, class_name, category, order_name, family, genus, name, sub_species, variety, sub_variety, clone, forma, species, identificationFeatures, additional_files, profile_image, lng, lat,marker, createdDatetimeStamp,addtionalCategories)
                VALUES('${serial}','${kingdom}','${phylum}','${classes}','${category.name}','${order}','${family}','${genus}','${JSON.stringify(nameOfSpecies)}','${subSpecies}','${variety}','${subVariety}','${clone}','${forma}','${species}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${lng}','${lat}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
            // console.log(insertQuery)
            let response = await executeQuery(insertQuery)

            res.status(200).json({
                success: true,
                data: response,
            })


        })
    }
    catch (err) {
        log(err)
        res.status(500).json({
            success: false,
            data: err,
        })
    }


}