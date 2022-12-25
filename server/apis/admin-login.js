const { getTable, executeQuery, uniqueIdGenerator, tableTypes, log, createQueryForSpecies } = require('../config/common');

const DB = require("../config/connectToDatabase");
const { matchKey } = require('../config/processor');

exports.BIOGAdminLogin = async (req, res, next) => {
    // console.log({searchParameters})
    let table = await getTable(tableTypes.admin)
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(406).json({
            success: false,
            message: "User Credential not valid!"
        })
    }
    let searchQuery = `select name,serial from ${table} where email ='${emailOrPhone}' or phone ='${emailOrPhone}`
    let response = await executeQuery(searchQuery)
    if (response.length == 0) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Phone"
        });
    }
    // this.password = await bcrypt.hash(this.password, 10);


    // Compare Password

    let isPasswordMatched = await bcrypt.compare(password, response[0].password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }

    res.status(200).json({
        message: "Admin Found",
        success: true,
        data: response[0],
    })

}