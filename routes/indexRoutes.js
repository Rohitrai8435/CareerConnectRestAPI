const express = require('express');
const router = express.Router();
const { homepage } = require('../controllers/indexControllers.js')

router.get("/",homepage);

module.exports = router;