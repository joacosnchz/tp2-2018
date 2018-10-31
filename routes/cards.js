var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:cardsroutes');
var controller = require('./../controllers/cards');

router.get('/', (req, res, next) => {
  controller.getAll((err, cards) => {
    if(err) {
      debug(err);
      res.sendStatus(500);
    } else {
      res.json(cards);
    }
  });
});

module.exports = router;
