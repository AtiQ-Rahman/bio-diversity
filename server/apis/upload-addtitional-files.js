const { getTable, executeQuery, uniqueIdGenerator, log, tableTypes } = require('../config/common');
const moment = require("moment/moment");


exports.uploadAdditionalFiles = async (req, res, next) => {
    try {
        // console.log(req.body.data)
        // console.log(req.files)
        let templateData = JSON.parse(req.body.data)
        let table = await getTable(tableTypes.uploadImage)
        let fileNameOnServer = []
        let files = req.files
        Promise.all(files.map(async (file) => {
            let fileName = 'additional/' + file.filename
            // keyList = JSON.stringify(keyList)
            let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
            let insertQuery = `insert into ${table} 
                (name , createdDatetimeStamp)
                VALUES('${fileName}','${createdDatetimeStamp}')`
            // console.log(insertQuery)
            let response = await executeQuery(insertQuery)
            console.log({response})
            // res.status(200).json({
            //     success: true,
            //     data: response,
            // })

        })
        ).then(() => {
            res.status(200).json({
                success: true,
                data: [],
            })
        }).catch(err =>{
            res.status(500).json({
                success: false,
                data: err,
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
