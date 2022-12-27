const { getTable, executeQuery, speciesTableTypes, isValidImageOrMarker, tableTypes } = require('../config/common');

const DB = require("../config/connectToDatabase");
const path = require("path")
const fs = require('fs')
let dir = path.join(__dirname, "uploads").replace(`apis`, "").replace(`server\\`, "public")
console.log(dir)

exports.getAllImages = async (req, res, next) => {
    let modifiedList = []
    let table = await getTable(tableTypes.uploadImage)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) {
        for (let item of response) {
            if (isValidImageOrMarker(item.name)) {
                modifiedList.push(item.name)
            }
        }
    }
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
exports.getBLOBFromFileName = async (req, res, next) => {
    console.log(req.body)
    res.setHeader("content-type", "application/octet-stream");
    fs.createReadStream(`${dir}/${req.body.additionalFileName}`).pipe(res);
}