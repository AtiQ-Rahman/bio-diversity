const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");

// creat a admin
router.post("/admin/new", async (req, res, next) => {
    console.log('working')
});
module.exports = router;
