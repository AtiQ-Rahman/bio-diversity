const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const speciesList = require("../files/speciesList")
// creat a admin
router.post("/get-species-list", async (req, res, next) => {
    console.log(speciesList)
    res.status(200).json({
        success: true,
        data : speciesList,
    })
});
module.exports = router;
