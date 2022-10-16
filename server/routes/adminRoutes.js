const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const path = require("path")
const { createNewSpecies, uploadSpeciesByExcel } = require('../apis/create-new-species');
const { BIOGetAllCategories } = require('../apis/get-all-categories');
const { addUpdateCategories } = require('../apis/add-update-categories');
const { BIOGetSpeciesByCategory } = require('../apis/get-species-by-category');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage })

router.post("/get-categories-list", BIOGetAllCategories);
router.post("/add-update-categories", addUpdateCategories);
router.post("/create-new-species", upload.array("additionalFiles", 100), createNewSpecies)
router.post("/upload-species-by-excel", uploadSpeciesByExcel)
router.post("/get-species-by-category", BIOGetSpeciesByCategory)



module.exports = router;
