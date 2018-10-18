var express = require('express');
var router = express.Router();
var cards = require('./cards');

router.use('/cards', cards);

module.exports = router;
