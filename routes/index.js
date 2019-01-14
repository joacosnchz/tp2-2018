var express = require('express');
var router = express.Router();
var cards = require('./cards');
var lists = require('./lists');
var boards = require('./boards');
var oauth2 = require('./oauth2');
var Con = require('./../controllers/oauth2');
let con = new Con();

router.use('/oauth2', oauth2);
router.use(con.authenticate);
router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);

module.exports = router;
