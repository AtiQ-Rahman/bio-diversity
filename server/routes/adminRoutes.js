const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const path = require("path")
const multer = require("multer");
const { createNewSpecies, uploadSpeciesByExcel } = require('../apis/create-new-species');
const { BIOGetAllCategories } = require('../apis/get-all-categories');
const { BIOGetAllTemplates, BIOUpdateSelectedTemplate } = require('../apis/get-all-templates');
const { addUpdateCategories } = require('../apis/add-update-categories');
const { BIOGetSpeciesByCategory } = require('../apis/get-species-by-category');
const { addUpdateSubCategories } = require("../apis/add-update-subcategories");
const { createNewTemplate, updateSelectedTemplate } = require("../apis/create-new-templates");
const { getAllImages, getBLOBFromFileName } = require("../apis/get-all-images");
const { requestNewSpecies, getAllRequestedSpecies } = require("../apis/manage-requested-species");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage })

router.post("/create-new-species", upload.array("additionalFiles", 100), createNewSpecies)
router.post("/upload-species-by-excel", uploadSpeciesByExcel)
router.post("/get-blob-from-filename", getBLOBFromFileName)

router.post("/get-categories-list", BIOGetAllCategories);
router.post("/add-update-categories", addUpdateCategories);
router.post("/get-species-by-category", BIOGetSpeciesByCategory)
router.post("/add-update-subcategories", addUpdateSubCategories);

router.post("/create-new-template", upload.array("sliderImages", 100), createNewTemplate)
router.post("/get-template-list", BIOGetAllTemplates);
router.post("/update-selected-template", updateSelectedTemplate);
router.post("/get-all-images", getAllImages);
router.post("/update-slider-image", BIOUpdateSelectedTemplate);

router.post("/send-request-for-new-species", upload.array("additionalFiles", 100), requestNewSpecies);
router.post("/get-all-requested-species", getAllRequestedSpecies);



module.exports = router;
