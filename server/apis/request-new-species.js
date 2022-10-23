const { getTable, executeQuery, uniqueIdGenerator, log, tableTypes } = require('../config/common');
const DB = require("../config/connectToDatabase");
const moment = require("moment/moment");
const { processKeys } = require('../config/processor');


exports.requestNewSpecies = async (req, res, next) => {
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
            let table = await getTable(tableTypes.requestedSpecies)

            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, nameOfSpecies, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, lng, lat, marker, category, profileIndex, addtionalCategories, district, requestedBy, subGroup } = speciesData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            let { english, bangla, commonName, synonym } = nameOfSpecies

            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (serial, status, kingdom, phylum, class_name, category, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species, district, subGroup, identificationFeatures, additional_files, profile_image, marker, createdDatetimeStamp,addtionalCategories, requested_by)
                VALUES('${serial}','pending','${kingdom}','${phylum}','${class_name}','${category.name}','${order_name}','${family}','${genus}','${english}','${bangla}','${commonName}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(district)}','${subGroup}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}','${JSON.stringify(requestedBy)}')`
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