const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + ".jpeg");
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const predictionController = require('../controllers/prediction');

const router = express.Router();

router.post('/prediction', upload.any(), predictionController.createPrediction);

module.exports = router;