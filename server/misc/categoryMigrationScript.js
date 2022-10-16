const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');
const moment = require("moment/moment");



const migrateCategory = async () => {

    let table = await getTable(tableTypes.categories)
    let searchQuery = `select * from ${table}`
    let response = await executeQuery(searchQuery)
    console.log({ response })
    let count = 0
    if (response?.length > 0) {
        let categories = []
        for (let item of response) {
            let keyList = JSON.parse(item.keyList)

            for (let key of keyList) {
                let createdDatetimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");

                let insertQuery = `insert into bio_diversity_subcategories
                 (name , linkID , createdDatetimeStamp) values('${key.name}','${item.serial}' , '${createdDatetimeStamp}')`
                await executeQuery(insertQuery)
                console.log(count++)

            }
        }
        console.log('ended')
    }

}
migrateCategory()