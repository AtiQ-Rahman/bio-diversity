const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");

const typeObject = {
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
const getDetailsByQuery = async (searchQuery, key, modifiedList, isJson) => {
    let response = await executeQuery(searchQuery)
    console.log({ response })

    if (response?.length > 0) {
        for (let item of response) {
            // console.log({ item })
            let isExist = typeObject[modifiedList].findIndex((modifiedItem) => item[key] == modifiedItem[key])
            if (isExist == -1) {
                console.log({ modifiedList })
                if (item[key]?.toLowerCase() != 'n/a' && item[key] !== '' && item[key] !== 'null' && item[key] !== 'undifined' && item[key]) {
                    typeObject[modifiedList].push(item)
                }
            }
            else if (isExist > -1) {
                // typeObject[modifiedList][isExist] = {
                //     ...typeObject[modifiedList][isExist],
                //     ...item
                // }
            }
        }

    }

}
exports.getUniqueTypes = async (req, res, next) => {
    let category = req.body.category
    let fetchSequences = [
        { parent: null, child: 'subGroup', list: 'subGroups' },
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
        { parent: null, child: 'csequestration', list: 'cSequestrations', isJson: true },
        { parent: null, child: 'cproduction', list: 'cProductions', isJson: true },
        { parent: null, child: 'ecosystemstatus', list: 'ecosystemStatuses', isJson: true },
        { parent: null, child: 'ecosystemvalue', list: 'ecosystemValues', isJson: true },
        { parent: null, child: 'speciestaxa', list: 'speciestaxas', isJson: true },
        { parent: null, child: 'geneticdata', list: 'geneticdatas', isJson: true },
    ]
    // for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(category)
        // let searchQuery = `select kingdom from ${table} group by kingdom`
        // await getDetailsByQuery(searchQuery, 'kingdom', 'kingdoms')
        for (let item of fetchSequences) {
            let searchQuery;
            if (!item.parent) {
                if (item.isJson) {
                    searchQuery = `select JSON_EXTRACT(identificationFeatures ,"$.${item.child}") as ${item.child} from ${table} group by JSON_EXTRACT(identificationFeatures ,"$.${item.child}")`
                }
                else {
                    searchQuery = `select  ${item.child} from ${table} group by ${item.child}`
                }
            }
            else {
                searchQuery = `select ${item.parent} , ${item.child} from ${table} group by ${item.child}`
            }
            console.log(searchQuery)
            await getDetailsByQuery(searchQuery, item.child, item.list, item.isJson)
        }
    // }

    res.status(200).json({
        success: true,
        data: typeObject,
    })



}