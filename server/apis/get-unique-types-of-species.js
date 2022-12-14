const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

const createTypeObject = () => {
    return {
        categories: [],
        subGroups: [],
        kingdoms: [],
        phylums: [],
        classes: [],
        orders: [],
        families: [],
        genuses: [],
        speciesListFromServer: [],
        subSpeciesList: [],
        varieties: [],
        subVarieties: [],
        subVarieties: [],
        clones: [],
        formas: [],
        cSequestrations: [],
        cProductions: [],
        ecosystemStatuses: [],
        ecosystemValues: [],
        geneticdatas: [],
        speciestaxas: [],
    }
}
const getDetailsByQuery = async (searchQuery, key, modifiedList, typeObject) => {
    let response = await executeQuery(searchQuery)
    if (response?.length > 0) {
        for (let item of response) {

            if (typeof item[key] == 'object' && item[key]) {
                item[key] = item[key].name
            }
            else if (typeof item[key] == 'string') {
                if (item[key].includes(`{`)) {
                    item[key] = JSON.parse(item[key]).name

                }
                else if (item[key].includes(`"`)) {
                    item[key] = item[key].replaceAll(`"`, '')
                }
            }
            let isExist = typeObject[modifiedList].findIndex((modifiedItem) => item[key]?.trim()?.toLowerCase() == modifiedItem[key].trim()?.toLowerCase())
            if (isExist == -1) {
                if (item[key]?.trim()?.toLowerCase() != 'n/a' && item[key] !== '' && item[key] !== 'null' && item[key] !== 'undifined' && item[key]) {
                    typeObject[modifiedList].push(item)
                }
            }
            else if (isExist > -1) {
                typeObject[modifiedList][isExist] = {
                    ...typeObject[modifiedList][isExist],
                    ...item
                }
            }
        }

    }

}
exports.getUniqueTypes = async (req, res, next) => {
    let category = req.body.category
    let searchJson = false
    try {
        if (category.match(/eco/i) || category.match(/genetic/i)) {
            searchJson = true
        }
        let typeObject = createTypeObject()
        let fetchSequences = [
            { parent: null, child: 'subCategory', list: 'categories' },
            { parent: "subCategory", child: 'subGroup', list: 'subGroups' },
            { parent: 'subGroup', child: 'kingdom', list: 'kingdoms' },
            { parent: 'kingdom', child: 'phylum', list: 'phylums' },
            { parent: 'phylum', child: 'class_name', list: 'classes' },
            { parent: 'class_name', child: 'order_name', list: 'orders' },
            { parent: 'order_name', child: 'family', list: 'families' },
            { parent: 'family', child: 'genus', list: 'genuses' },
            { parent: 'genus', child: 'species', list: 'speciesListFromServer' },
            { parent: 'species', child: 'sub_species', list: 'subSpeciesList' },
            { parent: null, child: 'variety', list: 'varieties' },
            { parent: 'variety', child: 'sub_variety', list: 'subVarieties' },
            { parent: null, child: 'clone', list: 'clones' },
            { parent: 'clone', child: 'forma', list: 'formas' },
            { parent: null, child: 'csequestration', list: 'cSequestrations' },
            { parent: null, child: 'cproduction', list: 'cProductions' },
            { parent: null, child: 'ecosystemstatus', list: 'ecosystemStatuses' },
            { parent: null, child: 'ecosystemvalue', list: 'ecosystemValues' },
            { parent: null, child: 'speciestaxa', list: 'speciestaxas' },
            { parent: null, child: 'geneticdata', list: 'geneticdatas' },
        ]
        // for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(category)
        // let searchQuery = `select kingdom from ${table} group by kingdom`
        // await getDetailsByQuery(searchQuery, 'kingdom', 'kingdoms')
        for (let item of fetchSequences) {
            let searchQuery;
            if (!item.parent) {
                if (item.isJson && searchJson) {
                    searchQuery = `select JSON_EXTRACT(identificationFeatures ,"$.${item.child}") as ${item.child} from ${table} group by JSON_EXTRACT(identificationFeatures ,"$.${item.child}")`
                    await getDetailsByQuery(searchQuery, item.child, item.list, typeObject)
                }
                else if (!item.isJson) {
                    searchQuery = `select ${item.child} from ${table} group by ${item.child}`
                    await getDetailsByQuery(searchQuery, item.child, item.list, typeObject)
                }
            }
            else {
                searchQuery = `select ${item.parent} , ${item.child} from ${table} group by ${item.child}`
                await getDetailsByQuery(searchQuery, item.child, item.list, typeObject)
            }
        }
        // }
        res.status(200).json({
            success: true,
            data: typeObject,
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            data: err,
        })
    }




}