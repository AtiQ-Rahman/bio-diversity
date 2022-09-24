const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const { createNewSpecies } = require('../apis/create-new-species');
const { BIOGetAllCategories } = require('../apis/get-all-categories');
const { addUpdateCategories } = require('../apis/add-update-categories');



router.post("/get-categories-list", BIOGetAllCategories);
router.post("/add-update-categories", addUpdateCategories);
router.post("/create-new-species" , createNewSpecies)



module.exports = router;
