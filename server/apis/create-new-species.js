const { getTable, executeQuery, uniqueIdGenerator, log, callGeocoderApi, tableTypes, speciesTableTypes, pageGroups } = require('../config/common');
const DB = require("../config/connectToDatabase");
const moment = require("moment/moment");
const { processKeys } = require('../config/processor');
async function getDistrict(splittedValue, districts) {
    for (let district of splittedValue) {
        let response = await callGeocoderApi(district)
        if (response) {
            let modifiedResponse = {
                place_name: response.place_name.replaceAll("'", ""),
                center: response.center
            }
            districts.push(modifiedResponse)
        }
    }
}

exports.createNewSpecies = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let speciesData = JSON.parse(req.body.data)
        let fileNameOnServer = []
        let files = req.files
        Promise.all(files.map((file) => {
            let category = speciesData.category
            category = category.name || category
            let splittedName = category.split(/[\s-&]+/)
            let joinedName = splittedName.join('')
            category = joinedName.toLowerCase()
            fileNameOnServer.push(category + '/' + file.filename)
        })
        ).then(async () => {
            let table = await getTable(speciesData.category.name)
            let query;
            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, nameOfSpecies, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, thumbnailImage, lng, lat, marker, category, subCategory, profileIndex, addtionalCategories, district, subGroup, markerColor } = speciesData

            let { english, bangla, commonName, synonym } = nameOfSpecies
            let { csequestration, cproduction, ecosystemstatus, ecosystemvalue, geneticdata, speciestaxa } = identificationFeatures

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
                        (serial, kingdom, phylum, class_name, category,subCategory, order_name, family, genus, english, bangla, common,
                        synonym, sub_species, variety, sub_variety, clone, forma, species, csequestration, cproduction, ecosystemstatus,
                        ecosystemvalue, geneticdata, speciestaxa, district, subGroup, identificationFeatures, additional_files, profile_image,
                        marker, markerColor, createdDatetimeStamp, addtionalCategories)
                        VALUES('${serial}','${kingdom}','${phylum}','${class_name}','${category.name}','${subCategory}','${order_name}',
                        '${family}','${genus}','${english}','${bangla}','${commonName}','${synonym}','${sub_species}','${variety}',
                        '${sub_variety}','${clone}','${forma}','${species}','${csequestration}','${cproduction}','${ecosystemstatus}',
                        '${ecosystemvalue}','${geneticdata}','${speciestaxa}','${JSON.stringify(district)}','${subGroup}','${JSON.stringify(identificationFeatures)}',
                        '${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${marker}','${markerColor}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
                // console.log(insertQuery)
            }
            else {
                let lastModified = moment().format("YYYY-MM-DD HH:mm:ss");

                query = `update ${table} set 
                kingdom = '${kingdom}',phylum = '${phylum}',class_name = '${class_name}',category = '${category.name}',
                english = '${english}',bangla = '${bangla}',common = '${commonName}',synonym = '${synonym}',
                subCategory = '${subCategory}',order_name = '${order_name}',family = '${family}',genus = '${genus}',
                variety = '${variety}',sub_variety = '${sub_variety}',clone = '${clone}',forma = '${forma}',species = '${species}',
                csequestration = '${csequestration}',cproduction = '${cproduction}',ecosystemstatus = '${ecosystemstatus}',
                ecosystemvalue = '${ecosystemvalue}',geneticdata = '${geneticdata}',speciestaxa = '${speciestaxa}', markerColor = '${markerColor}',
                district = '${JSON.stringify(district)}',subGroup = '${subGroup}',identificationFeatures = '${JSON.stringify(identificationFeatures)}',
                additional_files = '${fileNameOnServer}' ,profile_image = '${fileNameOnServer[profileIndex]}'
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
                    object[splittedKey[0]][splittedKey[1]] = uploadedSpecies[item][idx].replaceAll("'", "")
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
            console.log({ object })
            if (!object.species && object.english) {
                object.category = pageGroups.eco
                object.subGroup = object.types
            }
            if (!object.category || object?.category == '') {
                continue
            }
            let table
            if (object.category.match(/plant/i)) {
                table = await getTable(speciesTableTypes.plants)
                object.category = pageGroups.plants
            }
            else if (object.category.match(/animal/i)) {
                table = await getTable(speciesTableTypes.animals)
                object.category = pageGroups.animals
            }
            else if (object.category.match(/micro/i)) {
                table = await getTable(speciesTableTypes.micro)
                object.category = pageGroups.micro
            }
            else if (object.category.match(/fungi/i)) {
                table = await getTable(speciesTableTypes.fungi)
                object.category = pageGroups.fungi
            }
            else if (object.category.match(/eco/i)) {
                table = await getTable(speciesTableTypes.eco)
                object.category = pageGroups.eco
            }
            else if (object.category.match(/genetic/i)) {
                table = await getTable(speciesTableTypes.genetic)
                object.category = pageGroups.genetic
            }
            else if (object.category.match(/heterotrophs/i)) {
                table = await getTable(speciesTableTypes.fungi)
                object.category = pageGroups.fungi
            }
            else {
                table = await getTable(object.category)
            }



            let duplicateQuery = `select * from ${table} where species = '${object.species}' and variety = '${object.variety}'`
            if (object.category == pageGroups.eco) {
                duplicateQuery = `select * from ${table} where english = '${object.english}'`
            }
            let duplicateResponse = await executeQuery(duplicateQuery)
            if (duplicateResponse.length > 0) {
                continue
            }
            let { serial,
                kingdom, phylum, class_name, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, profile_image, additional_files, lng, lat, marker, category, subCategory, addtionalCategories, district, subGroup } = object
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let modifiedIdentifications = JSON.stringify(identificationFeatures)
            let districts = []
            if (district?.includes('+')) {
                // district = district.replaceAll(`"` , ``)
                let splittedValue = district.split('+')
                await getDistrict(splittedValue, districts)
            }
            else if (district?.includes(',')) {
                let splittedValue = district.split(',')
                await getDistrict(splittedValue, districts)
            }
            else if (district) {
                // district = district.replaceAll(`"` , ``)
                let response = await callGeocoderApi(district)
                if (response) {
                    let modifiedResponse = {
                        place_name: response.place_name.replaceAll(`'`, ``),
                        center: response.center
                    }
                    districts.push(modifiedResponse)

                }
                else {
                    districts.push([])
                }
            }
            await Promise.all(districts)
            let markerColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            object = {
                ...object, serial,
                kingdom, phylum, class_name, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,
                identificationFeatures, profile_image, additional_files, lng, lat, marker, category, subCategory, addtionalCategories, district, subGroup
            }
            let insertQuery = `insert into ${table} 
                    (serial, kingdom, phylum, class_name, category,subCategory, order_name, family, genus,
                     english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species,
                      district ,subGroup, identificationFeatures, lng, lat,marker,
                      markerColor, createdDatetimeStamp, addtionalCategories)
                    VALUES('${serial}','${kingdom}','${phylum}','${class_name}','${category}','${subCategory}','${order_name}',
                    '${family}','${genus}','${english}','${bangla}','${common}','${synonym}','${sub_species}','${variety}',
                    '${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(districts)}','${subGroup}',
                    '${modifiedIdentifications}','${lng}','${lat}','${marker}',
                    '${markerColor}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}')`
            // console.log(insertQuery)
            let response = await executeQuery(insertQuery)
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