const { getTable, executeQuery, uniqueIdGenerator, log, tableTypes } = require('../config/common');
const DB = require("../config/connectToDatabase");
const moment = require("moment/moment");
const { processKeys } = require('../config/processor');


exports.createNewTemplate = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let templateData = JSON.parse(req.body.data)
        let fileNameOnServer = []
        let files = req.files
        Promise.all(files.map((file) => {
            fileNameOnServer.push(file.filename)
        })
        ).then(async () => {
            let table = await getTable(tableTypes.homepage)

            let { serial, recentSighting, name } = templateData
            if (!serial) {
                serial = await uniqueIdGenerator(table, 5)
            }
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (name , serial, sliderImages, recentSighting, createdDatetimeStamp)
                VALUES('${name}','${serial}','${fileNameOnServer}','${recentSighting}','${createdDatetimeStamp}')`
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

exports.updateSelectedTemplate = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let templateData = req.body
        let table = await getTable(tableTypes.homepage)

        let { serial } = templateData
        console.log(templateData)
        // keyList = JSON.stringify(keyList)
        let lastModified = moment().format("YYYY-MM-DD HH:mm:ss");
        let updateQuery = `update ${table} set selected = false , lastModified = '${lastModified}'  where selected`
        // console.log(insertQuery)
        let response = await executeQuery(updateQuery)
        let updateQuery2 = `update ${table} set selected = true , lastModified = '${lastModified}'  where serial = '${serial}'`
        // console.log(insertQuery)
        let response2 = await executeQuery(updateQuery2)

        res.status(200).json({
            success: true,
            data: response2,
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
