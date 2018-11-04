var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:cardsroutes');
var controller = require('./../controllers/cards');

router.get('/', (req, res) => {
  controller.getAll(req.query, (err, cards) => {
    if(err) {
      debug(err);
      res.sendStatus(500);
    } else {
      res.json(cards);
    }
  });
});

router.post('/', (req, res) => {
  controller.create({
    name: req.body.name,
    desc: req.body.desc,
    idList: req.body.idList
  }, err => {
    if(err) {
      debug(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/:id', (req, res) => {
  controller.getOne(req.params.id, (err, card) => {
    if(err) {
      debug(err);
      res.sendStatus(500);
    } else {
      res.json(card);
    }
  });
});

router.put('/:id', (req, res) => {
  controller.edit(req.params.id, {
    name: req.body.name,
    desc: req.body.desc
  }, err => {
    if(err) {
      debug(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
});

router.delete('/:id', (req, res) => {
  controller.remove(req.params.id, err => {
    if(err) {
      debug(err);
      res.sendStatus(500); 
    } else {
      res.sendStatus(200);
    }
  })
});

module.exports = router;
