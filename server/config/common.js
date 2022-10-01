const db = require("./connectToDatabase")
const dbName = process.env.DATABASE

const createQueryForSpecies = async (table) => {
    console.log({ table })
    let query = `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        serial varchar(10),
        name varchar(255),
        profile_image longtext,
        category varchar(255),
        identificationFeatures longtext,
        additionaL_files longtext,
        kingdom varchar(255),
        phylum varchar(255),
        class_name varchar(255),
        order_name varchar(255),
        family varchar(255),
        genus varchar(255),
        species varchar(255),
        addtionalCategories longtext,
        sub_species varchar(255),
        address varchar(255),
        clone varchar(255),
        variety varchar(255),
        sub_variety varchar(255),
        forma varchar(255),
        createdDatetimeStamp datetime,
        lng varchar(255),
        lat varchar(255),
        marker longtext,
        PRIMARY KEY (id)
    );`
    let res = await this.executeQuery(query)
    return res
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
exports.tableTypes = {
    categories: 'categories',
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
exports.executeQuery = async (query) => {
    let res = await db.query(query).catch(async err => {
        if (err) {


            if (err.code === 'ER_NO_SUCH_TABLE') {
                let tableName = await this.getTableNameFromSql(err.sql)
                let response = await createQueryForSpecies(tableName)
                return response
            }
            else if (err.sqlMessage.match('Unknown column')) {
                let tableName = await this.getTableNameFromSql(err.sql)
                let columnName = await this.getColumnNameFromSql(err.sqlMessage)
                console.log(columnName)

                let query = `ALTER table ${tableName} add column (${columnName} varchar(1000));`
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
