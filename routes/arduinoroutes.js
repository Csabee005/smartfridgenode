const express = require('express');

const predictionController = require('../controllers/prediction');

const router = express.Router();

router.post('/prediction', predictionController.createPrediction);

module.exports = router;