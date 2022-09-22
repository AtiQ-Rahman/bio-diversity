const db = require("./connectToDatabase")
const dbName = process.env.DATABASE

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
