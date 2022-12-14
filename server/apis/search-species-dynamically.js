const { getTable, executeQuery, uniqueIdGenerator, speciesTableTypes, log, createQueryForSpecies, tableTypes } = require('../config/common');
const moment = require("moment/moment");
const { matchKey } = require('../config/processor');

exports.searchSpeciesDynamically = async (req, res, next) => {
    let searchText = req.body.searchText
    let searchResult = []
    let totalAvailable = 0
    for (let key of Object.keys(speciesTableTypes)) {
        let table = await getTable(speciesTableTypes[key])

        let searchQuery = `select * from ${table}
         where UPPER(kingdom) LIKE UPPER('%${searchText}%') or UPPER(phylum) LIKE UPPER('%${searchText}%') or
         UPPER(bangla) LIKE UPPER('%${searchText}%') or UPPER(english) LIKE UPPER('%${searchText}%') or
         UPPER(common) LIKE UPPER('%${searchText}%') or UPPER(synonym) LIKE UPPER('%${searchText}%') or
         UPPER(subGroup) LIKE UPPER('%${searchText}%') or UPPER(category) LIKE UPPER('%${searchText}%') or
         UPPER(class_name) LIKE UPPER('%${searchText}%') or UPPER(order_name) LIKE UPPER('%${searchText}%') or
         UPPER(family) LIKE UPPER('%${searchText}%') or UPPER(genus) LIKE UPPER('%${searchText}%') or
         UPPER(species) LIKE UPPER('%${searchText}%') or UPPER(sub_species) LIKE UPPER('%${searchText}%') or
         UPPER(variety) LIKE UPPER('%${searchText}%') or UPPER(sub_variety) LIKE UPPER('%${searchText}%') or
         UPPER(clone) LIKE UPPER('%${searchText}%') or UPPER(forma) LIKE UPPER('%${searchText}%')
         `
        let list = await matchKey()
        for (let item of list) {
            // console.log(uploadedSpecies[item])
            let splittedKey = item.key.split('.')
            if (splittedKey.length > 1) {
                searchQuery += ` or UPPER(JSON_EXTRACT(${splittedKey[0]}, "$.${splittedKey[1]}")) like JSON_QUOTE(UPPER("%${searchText}%"))`

            }
        }
        let response = await executeQuery(searchQuery)
        // console.log({ response })
        if (response.length > 0) {
            for (let item of response) {
                searchResult.push(item)
            }

        }
    }
    searchResult = searchResult.sort((a, b) => {
        if (a.createdDatetimeStamp > b.createdDatetimeStamp) return -1;
        if (a.createdDatetimeStamp < b.createdDatetimeStamp) return 1;
        return 0;
    });
    console.log(searchResult)
    res.status(200).json({
        success: true,
        data: searchResult,
        message: searchResult.length == 0 ? 'No Species Found' : null
    })

}