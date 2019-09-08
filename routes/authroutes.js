const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/auth', authController.postCheckLoginCredentials);

module.exports = router;