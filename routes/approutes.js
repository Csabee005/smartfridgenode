const express = require('express');

const appController = require('../controllers/preference');

const router = express.Router();

router.get('/preferences', appController.getEveryPreference);

router.get('/preference/:userId', appController.getPreference);

router.post('/preference', appController.createPreference);

router.put('/preference/:userId', appController.editPreference);

router.delete('/preference/:userId', appController.deletePreference);

module.exports = router;