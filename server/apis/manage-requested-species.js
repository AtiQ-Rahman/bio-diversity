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
                identificationFeatures, lng, lat, marker, category, subCategory, profileIndex, addtionalCategories, district, requestBy, subGroup, markerColor } = speciesData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            let { english, bangla, commonName, synonym } = nameOfSpecies
            console.log(speciesData)
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (serial, status, kingdom, phylum, class_name, category, subCategory, order_name, family, genus, english, bangla, common, synonym, sub_species, variety, sub_variety, clone, forma, species, district, subGroup, identificationFeatures, additional_files, profile_image, marker,markerColor, createdDatetimeStamp,addtionalCategories, requested_by)
                VALUES('${serial}','pending','${kingdom}','${phylum}','${class_name}','${category.name}','${subCategory}','${order_name}','${family}','${genus}','${english}','${bangla}','${commonName}','${synonym}','${sub_species}','${variety}','${sub_variety}','${clone}','${forma}','${species}','${JSON.stringify(district)}','${subGroup}','${JSON.stringify(identificationFeatures)}','${fileNameOnServer}','${fileNameOnServer[profileIndex]}','${marker}','${markerColor}','${createdDatetimeStamp}','${JSON.stringify(addtionalCategories)}','${JSON.stringify(requestBy)}')`
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
exports.getAllRequestedSpecies = async (req, res, next) => {
    let modifiedList = []

    let table = await getTable(tableTypes.requestedSpecies)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) {
        let modifiedResponse = []
        for (let item of response) {
            let districts = []
            if (item.district.includes('+')) {
                let splittedValue = item.district.split('+')
                splittedValue.map((item) => {
                    districts.push({
                        place_name: item,
                        center: null
                    })
                })
            }
            else {
                if (item.district.includes('{'))
                    districts = item?.district ? JSON.parse(item.district) : []
                else
                    districts = item?.district || []
            }
            modifiedResponse.push({
                ...item,
                identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                additionalFiles: item?.additional_files?.split(',') || '',
                name: item?.name ? JSON.parse(item.name) : {},
                districts: districts,

            })
        }
        modifiedList = modifiedList.concat(modifiedResponse)
    }


    // console.log(modifiedList.length)
    res.status(200).json({
        success: true,
        data: modifiedList,
    })
}