var express = require('express');
var router = express.Router();
var cards = require('./cards');
var lists = require('./lists');
var boards = require('./boards');
var root = require('./root');

router.use('/', root);
router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);

module.exports = router;
