var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:listsroutes');
var controller = require('./../controllers/lists');

router.get('/:id', (req, res) => {
    console.log(req.params)
    controller.getAllCardsByListId(req.params.id, (err, cards) => {
        if(err) {
            debug(err);
            res.sendStatus(500);
        } else {
            res.json(cards);
        }
    });
});

module.exports = router;
