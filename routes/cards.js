var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:cardsroutes');
var CardsController = require('./../controllers/cards');
var AttachmentsController = require('./../controllers/attachments');
var multer  = require('multer');
var upload = multer({ dest: '/tmp/' });

router.get('/', (req, res) => {
  let controller = new CardsController();
  controller.getAll(req.query, (err, cards) => {
    if(err) {
      debug(err);
      res.status(500).send();
    } else {
      res.json(cards);
    }
  });
});

router.post('/', (req, res) => {
  let controller = new CardsController();
  controller.create({
    name: req.body.name,
    desc: req.body.desc,
    idList: req.body.idList
  }, (err, createdCard) => {
    if(err) {
      debug(err);
      res.status(500).send();
    } else {
      res.json(createdCard);
    }
  });
});

router.get('/:id/attachments', (req, res) => {
  let attachmentsController = new AttachmentsController();
  attachmentsController.getByCard(req.params.id, (err, attachments) => {
    if(err) {
      res.status(500).send();
    } else {
      res.json(attachments);
    }
  });
});

router.post('/:id/attachments', upload.single('file'), (req, res) => {
  let attachmentsController = new AttachmentsController();
  attachmentsController.addToCard(req.params.id, req.file, (err) => {
    if(err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  })
});

router.delete('/:id_card/attachments/:id_attachment', (req, res) => {
  let attachmentsController = new AttachmentsController();
  attachmentsController.deleteFromCard(req.params.id_card, req.params.id_attachment, err => {
    if(err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
});

router.get('/:id', (req, res) => {
  let controller = new CardsController();
  controller.getOne(req.params.id, (err, card) => {
    if(err) {
      debug(err);
      res.status(500).send();
    } else {
      res.json(card);
    }
  });
});

router.put('/:id', (req, res) => {
  let controller = new CardsController();
  controller.edit(req.params.id, {
    name: req.body.name,
    desc: req.body.desc,
    idList: req.body.idList
  }, err => {
    if(err) {
      debug(err);
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  })
});

router.delete('/:id', (req, res) => {
  let controller = new CardsController();
  controller.remove(req.params.id, err => {
    if(err) {
      debug(err);
      res.status(500).send(); 
    } else {
      res.status(200).send();
    }
  })
});

module.exports = router;
