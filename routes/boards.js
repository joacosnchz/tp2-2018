var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:boardsroutes');
var controller = require('../controllers/boards');

router.get('/:id', (req, res) => {
    controller.getOne(req.params.id, (err, board) => {
        if(err) {
            debug(err);
            res.sendStatus(500);
        } else {
            res.json(board);
        }
    });
});

module.exports = router;