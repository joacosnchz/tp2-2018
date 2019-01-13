var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:boardsroutes');
var BoardsController = require('../controllers/boards');

router.get('/:id/lists', (req, res) => {
  let controller = new BoardsController(null, null);

  controller.getAllListIdsFromBoard(req.params.id).then(lists => {
    res.send(lists);
  }).catch(err => {
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
    let controller = new BoardsController(null, null);
    
    controller.getOne(req.params.id, (err, board) => {
        if(err) {
            debug(err);
            res.status(500).send();
        } else {
            res.json(board);
        }
    });
});

module.exports = router;