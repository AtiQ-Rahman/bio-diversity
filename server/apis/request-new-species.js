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
                identificationFeatures, lng, lat, marker, category, profileIndex, addtionalCategories, district, requestedBy } = speciesData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            let { english, bangla, commonName, synonym } = nameOfSpecies

            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (serial, status, kingdom, phylum, class_name, category, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species, district, identificationFeatures, additional_files, profile_image, marker, createdDatetimeStamp,addtionalCategories, requested_by)
                VALUES('${serial}','pending','${kingdom}','${phylum}','${class_name}','${category.name}','${order_name}','${family}','${genus}','${english}','${bangla}','${commonName}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(district)}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}','${JSON.stringify(requestedBy)}')`
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

exports.uploadSpeciesByExcel = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let data = req.body
        let fileNameOnServer = []
        let files = req.files
        let modifiedData = []
        // console.log(data)
        let { uploadedSpecies, type } = data
        let headersArray = uploadedSpecies[0]
        let headers = {}
        headersArray.forEach(element => {
            headers[element] = ""
        })
        // console.log(headers)
        for (let item = 1; item < uploadedSpecies.length; item++) {
            let object = {};
            for (let idx = 0; idx < uploadedSpecies[item].length; idx++) {
                let key = await processKeys(Object.keys(headers)[idx])
                let splittedKey = key.split('.')
                // console.log(splittedKey)
                if (splittedKey.length > 1) {
                    if (!(object[splittedKey[0]])) {
                        object[splittedKey[0]] = {}
                    }
                    object[splittedKey[0]][splittedKey[1]] = uploadedSpecies[item][idx]
                }
                else {
                    if (key == 'gis') {
                        let splittedValue = uploadedSpecies[item][idx].split(',')
                        object['lng'] = splittedValue[0].trim()
                        object['lat'] = splittedValue[1].trim()

                    }
                    else { object[key] = uploadedSpecies[item][idx].replaceAll("'", "") }
                }
            }

            let table = await getTable(object.category)
            console.log(table)

            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, profile_image, additional_files, lng, lat, marker, category, addtionalCategories, district } = object
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let modifiedIdentifications = JSON.stringify(identificationFeatures)
            console.log(modifiedIdentifications)
            let insertQuery = `insert into ${table} 
                    (serial, kingdom, phylum, class_name, category, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,district , identificationFeatures, additional_files, profile_image, lng, lat,marker, createdDatetimeStamp, addtionalCategories)
                    VALUES('${serial}','${kingdom}','${phylum}','${class_name}','${category}','${order_name}','${family}','${genus}','${english}','${bangla}','${common}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${district}','${modifiedIdentifications}','${additional_files}','${profile_image}','${lng}','${lat}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
            // console.log(insertQuery)
            let response = await executeQuery(insertQuery)
            console.log(response)
        }
        res.status(200).json({
            success: true,
            data: "",
        })


        // res.status(200).json({
        //     success: true,
        //     data: response,
        // })



    }
    catch (err) {
        log(err)
        res.status(500).json({
            success: false,
            data: err,
        })
    }


}