var express = require('express');
var router = express.Router();
var cards = require('./cards');
var lists = require('./lists');
var boards = require('./boards');
var oauth2 = require('./oauth2');
var passport = require('passport');

router.use(passport.authenticate('bearer', { session: false }));
router.use('/oauth2', oauth2);
router.use(passport.authenticate('token'));
router.use('/cards', cards);
router.use('/lists', lists);
router.use('/boards', boards);

module.exports = router;
