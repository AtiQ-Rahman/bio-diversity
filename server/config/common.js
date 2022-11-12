const db = require("./connectToDatabase");
const fetch = require("node-fetch");
const { categoryTable, homepageTable, subcategoriesTable, speciesTable, requestSpeciesTable, deletedSpeciesTable } = require("./db-tables");
const dbName = process.env.DATABASE

const createQueryForSpecies = async (table) => {
    console.log({ table })
    let query;
    if (table == await processTableName(this.tableTypes.categories)) {
        query = categoryTable(table)
    }
    else if (table == await processTableName(this.tableTypes.homepage)) {
        query = homepageTable(table)
    }
    else if (table == await processTableName(this.tableTypes.subcategories)) {
        query = subcategoriesTable(table)
    }
    else if (table == await processTableName(this.tableTypes.requestedSpecies)) {
        query = requestSpeciesTable(table)
    }
    else if (table == await processTableName(this.tableTypes.deletedSpecies)) {
        query = deletedSpeciesTable(table)
    }
    else {
        query = speciesTable(table)
    }
    let res = await this.executeQuery(query)
    return res
}
exports.isValidImageOrMarker = (fileName) => {
    if (fileName == '' || fileName.toLowerCase() == 'n/a') {
        return false
    }
    else {
        return true
    }
}
exports.log = (message = '', value = '') => {
    if (value == '') return console.log(message)
    return console.log(message, value)
}
exports.speciesTableTypes = {
    plants: "plants",
    animals: "animals",
    microOrgan: "microorganisms",
    fungi: "fungi",
    eco: "ecosystemdiversity",
    genetic: "geneticsubcellulardiversity"
}
exports.pageGroups = {
    plants: 'Plants',
    animals: 'Animals',
    fungi: 'Fungi',
    micro: 'Microorganisms',
    eco: 'Ecosystem Diversity',
    genetic: 'Genetic & Sub-Cellular Diversity'
}
exports.tableTypes = {
    categories: 'categories',
    subcategories: 'subcategories',
    homepage: 'homepage',
    requestedSpecies: 'requestedspecies',
    deletedSpecies: 'deletedspecies',
}

exports.getTableNameFromSql = async (sql) => {
    let matchIndex = sql.match(/bio_diversity/i).index
    let tableName = sql.slice(matchIndex, sql.length).split(/[\s]+/)[0]
    return tableName
}
exports.getColumnNameFromSql = async (message) => {
    let matchIndex = message.match(/'/i).index
    let columnName = message.slice(matchIndex, message.length).split(/[\s]+/)[0].replaceAll("'", '')
    return columnName
}
exports.callGeocoderApi = async (value) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.MAPBOX_KEY}&bbox=88.007207%2C20.4817039%2C92.679485%2C26.638142`
    let response = await fetch(url)
    let data = await response.json()
    return data.features[0]
}
exports.executeQuery = async (query) => {
    let res = await db.query(query).catch(async err => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_NO_SUCH_TABLE') {
                let tableName = await this.getTableNameFromSql(err.sql)
                await createQueryForSpecies(tableName)
                let response = await this.executeQuery(query)
                return response
            }
            else if (err.sqlMessage.match('Unknown column')) {
                let tableName = await this.getTableNameFromSql(err.sql)
                let columnName = await this.getColumnNameFromSql(err.sqlMessage)
                console.log(columnName)

                let columnQuery = `ALTER table ${tableName} add column (${columnName} longtext);`
                await this.executeQuery(columnQuery)
                let res = await this.executeQuery(query)

                return res;
            }
            else {
                return err
                // console.log({res})
            }
        }
    })
    return res?.length > 0 ? res[0] : []
}
const processTableName = async (name) => {
    let splittedName = name.split(/[\s-&]+/)
    let joinedName = splittedName.join('')
    const table = dbName + '_' + joinedName.toLowerCase()
    return table
}
exports.returnValidJson = async (data) => {
    if (typeof data == 'string') {
        if (data == 'undefined' || data == "" || data.toLowerCase() == "n/a") {
            return {}
        }
        else {
            let parsedData = JSON.parse(data)
            return parsedData
        }
    }
    else if (typeof data == 'object') {
        return data
    }
    else {
        return {}
    }

}
exports.getTable = async (type) => {
    const table = await processTableName(type)
    let query = `SELECT * FROM  ${table}`
    let res = await this.executeQuery(query)
    return table


}
exports.uniqueIdGenerator = async (table, length) => {

    let randomString = ''
    let characterList = []
    for (let i = 0; i < 25; i++) {
        characterList.push(String.fromCharCode('a'.charCodeAt() + i))
    }
    for (let i = 0; i < 25; i++) {
        characterList.push(String.fromCharCode('A'.charCodeAt() + i))
    }
    for (let i = 0; i < 9; i++) {
        characterList.push(String.fromCharCode('0'.charCodeAt() + i))
    }

    let len = characterList.length
    var idx, item, i;
    for (item = i = 1; 1 <= length ? i <= length : i >= length; item = 1 <= length ? ++i : --i) {
        idx = (Math.floor(Math.random() * 10000363)) % 10000019;
        idx %= len;
        randomString += characterList[idx];
    }
    let searchQuery = `select * from ${table} where serial = '${randomString}'`
    let response = await this.executeQuery(searchQuery)
    if (response?.[0]?.length > 0) this.uniqueIdGenerator()

    else return randomString
}
