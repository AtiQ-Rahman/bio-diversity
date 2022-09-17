const dbName = process.env.DATABASE
const getTable = (type) => {
    const table = dbName + '_' + type.toLowerCase()
    return table
}
module.exports = [
    getTable
]