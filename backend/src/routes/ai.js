const express = require('express');
const router = express.Router();
const controller = require('../controllers/aiController');

router.post('/suggest', controller.getSuggestions);

module.exports = router;