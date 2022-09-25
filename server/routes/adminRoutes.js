const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const { createNewSpecies } = require('../apis/create-new-species');
const { BIOGetAllCategories } = require('../apis/get-all-categories');
const { addUpdateCategories } = require('../apis/add-update-categories');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage })

router.post("/get-categories-list", BIOGetAllCategories);
router.post("/add-update-categories", addUpdateCategories);
router.post("/create-new-species", upload.array("additionalFiles", 100), createNewSpecies)



module.exports = router;
