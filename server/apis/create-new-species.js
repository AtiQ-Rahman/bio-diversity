const { getTable, executeQuery, uniqueIdGenerator, log, callGeocoderApi, tableTypes, speciesTableTypes } = require('../config/common');
const DB = require("../config/connectToDatabase");
const moment = require("moment/moment");
const { processKeys } = require('../config/processor');


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
            let query;
            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, nameOfSpecies, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, thumbnailImage, lng, lat, marker, category, profileIndex, addtionalCategories, district, subGroup } = speciesData

            let { english, bangla, commonName, synonym } = nameOfSpecies
            if (fileNameOnServer.length > 0 && speciesData.additionalFiles.length > 0) {
                speciesData.additionalFiles = speciesData.additionalFiles.concat(fileNameOnServer)
                fileNameOnServer = speciesData.additionalFiles
            }
            else if (speciesData.additionalFiles.length > 0) {
                fileNameOnServer = speciesData.additionalFiles
            }
            fileNameOnServer = fileNameOnServer.filter(item => typeof item == "string")
            console.log({ fileNameOnServer })
            // keyList = JSON.stringify(keyList)
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
                let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
                query = `insert into ${table} 
                    (serial, kingdom, phylum, class_name, category, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species, district, subGroup, identificationFeatures, additional_files, profile_image, marker, createdDatetimeStamp, addtionalCategories)
                    VALUES('${serial}','${kingdom}','${phylum}','${class_name}','${category.name}','${order_name}','${family}','${genus}','${english}','${bangla}','${commonName}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(district)}','${subGroup}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
                // console.log(insertQuery)
            }
            else {
                let lastModified = moment().format("YYYY-MM-DD HH:mm:ss");

                query = `update ${table} set 
                kingdom = '${kingdom}',phylum = '${phylum}',class_name = '${class_name}',category = '${category.name}',order_name = '${order_name}',family = '${family}',
                genus = '${genus}',english = '${english}',bangla = '${bangla}',common = '${commonName}',synonym = '${synonym}',sub_species = '${sub_species}',
                variety = '${variety}',sub_variety = '${sub_variety}',clone = '${clone}',forma = '${forma}',species = '${species}',district = '${JSON.stringify(district)}'
                ,subGroup = '${subGroup}',identificationFeatures = '${JSON.stringify(identificationFeatures)}',additional_files = '${fileNameOnServer}' ,profile_image = '${fileNameOnServer[profileIndex]}'
                ,marker = '${marker}' ,lastModified = '${lastModified}' ,addtionalCategories = '${JSON.stringify(addtionalCategories)}' where serial = '${serial}'`
                // console.log(insertQuery)
            }

            let response = await executeQuery(query)
            console.log({ response })
            if (!response) {
                res.status(500).json({
                    success: false,
                    data: "err",
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
        log(err)

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
        let { uploadedSpecies, type } = data
        uploadedSpecies = JSON.parse(uploadedSpecies)
        let headersArray = uploadedSpecies[0]
        let headers = {}
        headersArray.forEach(element => {
            headers[element] = ""
        })
        // console.log(headers)
        for (let item = 1; item < uploadedSpecies.length; item++) {
            let object = {};
            for (let idx = 0; idx < uploadedSpecies[item].length; idx++) {
                // console.log(uploadedSpecies[item])
                let key = await processKeys(Object.keys(headers)[idx])
                let splittedKey = key.split('.')
                if (splittedKey.length > 1) {
                    if (!(object[splittedKey[0]])) {
                        object[splittedKey[0]] = {}
                    }
                    object[splittedKey[0]][splittedKey[1]] = uploadedSpecies[item][idx]
                }
                else {
                    if (splittedKey[0] == 'gis') {
                        let splittedValue = uploadedSpecies[item][idx].split(',')
                        object['lng'] = splittedValue[0]?.trim()
                        object['lat'] = splittedValue[1]?.trim()

                    }

                    else { object[splittedKey[0]] = uploadedSpecies[item][idx].replaceAll("'", "") }
                }
            }
            let table
            if (object.category.match(/plant/i)) {
                table = await getTable(speciesTableTypes.plants)
            }
            else if (object.category.match(/animal/i)) {
                table = await getTable(speciesTableTypes.animals)
            }
            else if (object.category.match(/micro/i)) {
                table = await getTable(speciesTableTypes.microOrgan)
            }
            else if (object.category.match(/fungi/i)) {
                table = await getTable(speciesTableTypes.fungi)
            }
            else if (object.category.match(/eco/i)) {
                table = await getTable(speciesTableTypes.eco)
            }
            else if (object.category.match(/genetic/i)) {
                table = await getTable(speciesTableTypes.genetic)
            }
            else {
                table = await getTable(object.category)
            }

            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, profile_image, additional_files, lng, lat, marker, category, addtionalCategories, district, subGroup } = object
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let modifiedIdentifications = JSON.stringify(identificationFeatures)
            let districts = []
            if (district.includes('+')) {
                // district = district.replaceAll(`"` , ``)
                let splittedValue = item.district.split('+')
                for (let district of splittedValue) {
                    let response = await callGeocoderApi(district)
                    if (response) {
                        let modifiedResponse = {
                            place_name : response.place_name.replaceAll(`'`, ``),
                            center : response.center
                        }
                        districts.push(modifiedResponse)
                    }
                }
            }
            else {
                // district = district.replaceAll(`"` , ``)
                let response = await callGeocoderApi(district)
                if (response) {
                    let modifiedResponse = {
                        place_name : response.place_name.replaceAll(`'`, ``),
                        center : response.center
                    }
                    districts.push(modifiedResponse)

                }
                else {
                    districts.push([])
                }
            }
            console.log(modifiedIdentifications)
            let insertQuery = `insert into ${table} 
                    (serial, kingdom, phylum, class_name, category, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species, district ,subGroup, identificationFeatures, additional_files, profile_image, lng, lat,marker, createdDatetimeStamp, addtionalCategories)
                    VALUES('${serial}','${kingdom}','${phylum}','${class_name}','${category}','${order_name}','${family}','${genus}','${english}','${bangla}','${common}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(districts)}','${subGroup}','${modifiedIdentifications}','${additional_files}','${profile_image}','${lng}','${lat}','${marker}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
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