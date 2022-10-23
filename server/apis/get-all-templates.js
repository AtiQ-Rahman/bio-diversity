const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGetAllTemplates = async (req, res, next) => {

    let table = await getTable(tableTypes.homepage)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    console.log({ response })
    if (response?.length > 0) {
        res.status(200).json({
            success: true,
            data: response,
        })
    }
    else {
        res.status(200).json({
            success: true,
            data: [],
        })
    }



}
exports.BIOGetGetSelectedTemplate = async (req, res, next) => {

    let table = await getTable(tableTypes.homepage)
    let searchQuery = `select * from ${table} where selected`
    let response = await executeQuery(searchQuery)
    console.log({ response })
    if (response?.length > 0) {
        res.status(200).json({
            success: true,
            data: response,
        })
    }
    else {
        res.status(200).json({
            success: true,
            data: [],
        })
    }

}
exports.BIOUpdateSelectedTemplate = async (req, res, next) => {
    let { requestedImage, recentSightings } = req.body
    let table = await getTable(tableTypes.homepage)
    let searchQuery = `select * from ${table} where selected`
    let response = await executeQuery(searchQuery)
    let updateQuery
    if (response?.length > 0) {
        if (requestedImage) {
            let sliderImages = response[0].sliderImages?.split(',') || []
            console.log({ sliderImages, requestedImage })
            if (sliderImages.includes(requestedImage)) {
                let index = sliderImages.indexOf(requestedImage)
                sliderImages.splice(index, 1)
            }
            else {
                sliderImages.push(requestedImage)
            }
            sliderImages = sliderImages.filter(item => item)
            let updatedSlider = sliderImages.join(',')
            updateQuery = `update ${table} set sliderImages = '${updatedSlider}' where id =${response[0].id}`
        }
        else if (recentSightings) {
            updateQuery = `update ${table} set recentSighting = '${recentSightings}' where id =${response[0].id}`
        }
        let updateResponse = await executeQuery(updateQuery)
        res.status(200).json({
            success: true,
            data: updateResponse,
        })
    }
    else {
        res.status(404).json({
            success: false,
            data: [],
        })
    }

}