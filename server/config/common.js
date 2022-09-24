const db = require("./connectToDatabase")
const dbName = process.env.DATABASE


exports.log = (message = '', value = '') => {
    if(value == '') return console.log(message)
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
    db.query(query, (err, res) => {
        console.log(res)
        if (err) {
            return err
        }
        else {
            return res;

        }
    })
}
exports.getTable = (type) => {
    const table = dbName + '_' + type.toLowerCase()
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
    let searchQuery = `select * from ${table} where serial = '${randomString}`
    let response = this.executeQuery(searchQuery)
    if (response?.length > 0) this.uniqueIdGenerator()

    else return randomString
}
