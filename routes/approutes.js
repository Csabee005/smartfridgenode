const express = require('express');

const appController = require('../controllers/preference');

const router = express.Router();

router.get('/preference', appController.getEveryPreference);

router.get('/preference/:id', appController.getPreference);

router.post('/preference', appController.createPreference);

router.put('/preference/:id', appController.editPreference);

router.delete('/preference/:id', appController.deletePreference);

module.exports = router;