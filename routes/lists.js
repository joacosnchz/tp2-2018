var express = require('express');
var router = express.Router();
var debug = require('debug')('trello:listsroutes');
var controller = require('./../controllers/lists');

router.get('/:id/cards', (req, res) => {
    controller.getAllCardsByListId(req.params.id, (err, cards) => {
        if(err) {
            debug(err);
            res.status(500).send();
        } else {
            res.json(cards);
        }
    });
});

module.exports = router;
