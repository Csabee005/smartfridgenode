const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const predictionController = require('../controllers/prediction');

const router = express.Router();

router.post('/prediction', upload.single('productImage') , predictionController.createPrediction);

module.exports = router;