const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

exports.BIOGSearchParamsByField = async (req, res, next) => {
    let searchParameters = req.body.searchParameters
    // console.log({searchParameters})
    let table = await getTable(searchParameters.category)
    let searchQuery = `select * from ${table}`
    if (searchParameters.type) {
        searchQuery += ` where JSON_EXTRACT(identificationFeatures, "$.subCategory") REGEXP '${searchParameters.type}?'`
    }
    if (searchParameters.type) {
        searchQuery += ` and subGroup = '${searchParameters.subGroup}'`
    }
    if (searchParameters.kingdom) {
        searchQuery += ` and kingdom = '${searchParameters.kingdom}'`
    }
    if (searchParameters.phylum) {
        searchQuery += ` and phylum = '${searchParameters.phylum}'`
    }
    if (searchParameters.class_name) {
        searchQuery += ` and class_name = '${searchParameters.class_name}'`
    }
    if (searchParameters.order_name) {
        searchQuery += ` and order_name = '${searchParameters.order_name}'`
    }
    if (searchParameters.family) {
        searchQuery += ` and family = '${searchParameters.family}'`
    }
    if (searchParameters.genus) {
        searchQuery += ` and genus = '${searchParameters.genus}'`
    }
    if (searchParameters.species) {
        searchQuery += ` and species = '${searchParameters.species}'`
    }
    if (searchParameters.subSpecies) {
        searchQuery += ` and sub_species = '${searchParameters.subSpecies}'`
    }
    if (searchParameters.variety) {
        searchQuery += ` and variety = '${searchParameters.variety}'`
    }
    if (searchParameters.subVariety) {
        searchQuery += ` and sub_variety = '${searchParameters.subVariety}'`
    }
    if (searchParameters.clone) {
        searchQuery += ` and clone = '${searchParameters.clone}'`
    }
    if (searchParameters.forma) {
        searchQuery += ` and forma = '${searchParameters.forma}'`
    }
    if (searchParameters?.nameOfSpecies?.english) {
        searchQuery += ` and english REGEXP '${searchParameters.nameOfSpecies.english}?'`
    }
    if (searchParameters?.nameOfSpecies?.bangla) {
        searchQuery += ` and bangla REGEXP '${searchParameters.nameOfSpecies.bangla}?'`
    }
    if (searchParameters?.nameOfSpecies?.commonName) {
        searchQuery += ` and common REGEXP '${searchParameters.nameOfSpecies.commonName}?'`
    }
    if (searchParameters?.nameOfSpecies?.synonym) {
        searchQuery += ` and synonym REGEXP '${searchParameters.nameOfSpecies.synonym}?'`
    }
    if (searchParameters?.csequestration) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.csequestration") REGEXP '${searchParameters?.csequestration}?'`
    }
    if (searchParameters?.cproduction) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.cproduction") REGEXP '${searchParameters?.cproduction}?'`
    }
    if (searchParameters?.ecosystemstatus) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.ecosystemstatus") REGEXP '${searchParameters?.ecosystemstatus}?'`
    }
    if (searchParameters?.ecosystemvalue) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.ecosystemvalue") REGEXP '${searchParameters?.ecosystemvalue}?'`
    }
    if (searchParameters?.geneticdata) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.geneticdata") REGEXP '${searchParameters?.geneticdata}?'`
    }
    if (searchParameters?.speciestaxa) {
        searchQuery += ` and JSON_EXTRACT(identificationFeatures, "$.speciestaxa") REGEXP '${searchParameters?.speciestaxa}?'`
    }
    if(!searchQuery.includes('where')){
        searchQuery = searchQuery.replace('and' , 'where')
    }
    console.log(searchQuery)
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) {
        let modifiedResponse = []
        for (let item of response) {
            modifiedResponse.push({
                ...item,
                identificationFeatures: item?.identificationFeatures ? JSON.parse(item.identificationFeatures) : {},
                additionalFiles: item?.additional_files?.split(',') || '',
                name: item?.name ? JSON.parse(item.name) : {},
            })
        }
        res.status(200).json({
            message:"Found",
            success: true,
            data: modifiedResponse,
        })
    }
    else {
        res.status(200).json({
            message:"No Species Found",
            success: true,
            data: [],
        })
    }
}