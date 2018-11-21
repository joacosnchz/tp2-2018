var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:cardsroutes');
var controller = require('./../controllers/cards');
var attachmentsController = require('./../controllers/attachments');
var multer  = require('multer');
var upload = multer({ dest: '/tmp/' });

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

router.get('/:id/attachments', (req, res) => {
  attachmentsController.getByCard(req.params.id, (err, attachments) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(attachments);
    }
  });
});

router.post('/:id/attachments', upload.single('file'), (req, res) => {
  attachmentsController.addToCard(req.params.id, req.file, (err) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
});

router.delete('/:id_card/attachments/:id_attachment', (req, res) => {
  attachmentsController.deleteFromCard(req.params.id_card, req.params.id_attachment, err => {
    if(err) {
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
