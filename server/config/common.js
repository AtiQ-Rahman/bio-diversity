const db = require("./connectToDatabase")
const dbName = process.env.DATABASE

const createQueryForSpecies = async (table) => {
    let query = `CREATE TABLE ${table} (
        id int NOT NULL,
        serial varchar(10),
        name varchar(255),
        profile_image longtext,
        category varchar(255),
        idenitificationFeatures longtext,
        additionaL_files longtext,
        kingdom varchar(255),
        phylum varchar(255),
        class_name varchar(255),
        order_name varchar(255),
        family varchar(255),
        genus varchar(255),
        species varchar(255),
        sub_species varchar(255),
        variety varchar(255),
        sub_species varchar(255),
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
exports.tableTypes = {
    categories: 'categories',
    plants: "plants",
    animals: "animals",
    microOrgan: "microorganism",
    eco: "ecosystemdiversity",
    genetic: "geneticsubcellular"
}

exports.executeQuery = async (query) => {
    return db.query(query)
}
exports.getTable = async (type) => {
    const table = dbName + '_' + type.toLowerCase()
    let query = `SELECT * FROM  ${table};`
    let res = this.executeQuery(query)
    console.log(res)
    if (res.code === 'ER_NO_SUCH_TABLE') {
        await createQueryForSpecies(table)
        return table
    }
    else {
        return table
    }

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
    let searchQuery = `select * from ${table} where serial = '${randomString}`
    let response = this.executeQuery(searchQuery)
    if (response?.length > 0) this.uniqueIdGenerator()

    else return randomString
}
