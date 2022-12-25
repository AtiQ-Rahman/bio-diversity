
const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const speciesList = require("../files/speciesList")
const db = require('../config/connectToDatabase')
const { getTable } = require('../config/common')
const { getAllSpecies } = require('../apis/get-all-species');
const { BIOGetCategoriesByName } = require("../apis/get-categories-by-name");
const { BIOGSearchParamsByField } = require("../apis/search-species-by-field");
const { BIOGetSpeciesBySerial } = require("../apis/get-species-by-serial");
const { getUniqueTypes } = require("../apis/get-unique-types-of-species");
const { BIOGetGetSelectedTemplate } = require("../apis/get-all-templates");
const { requestNewSpecies } = require("../apis/manage-requested-species");
const { countAllSpecies } = require("../apis/count-all-species");
const { searchSpeciesDynamically } = require("../apis/search-species-dynamically");
const { getAllSpeciesByPagination } = require("../apis/get-species-by-pagination");

// creat a admin
router.post("/get-species-list", getAllSpecies);
router.post("/get-species-by-pagination", getAllSpeciesByPagination);
router.post("/get-categories-by-name", BIOGetCategoriesByName);
router.post("/search-species-by-field", BIOGSearchParamsByField);
router.post("/get-species-by-serial", BIOGetSpeciesBySerial);
router.post("/get-unique-types-of-species", getUniqueTypes);
router.post("/get-selected-template", BIOGetGetSelectedTemplate);
router.post("/send-request-for-new-species", requestNewSpecies);
router.post("/count-all-species", countAllSpecies);
router.post("/search-species-dynamically", searchSpeciesDynamically);


module.exports = router;
