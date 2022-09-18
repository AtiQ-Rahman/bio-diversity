const dbName = process.env.DATABASE
exports.getTable = (type) => {
    const table = dbName + '_' + type.toLowerCase()
    return table
}
