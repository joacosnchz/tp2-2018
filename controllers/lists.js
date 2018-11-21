var mongoose = require('mongoose');
require('./../models/list');
require('./../models/card');
var Card = mongoose.model('card');

class ListsController {
  getAllCardsByListId(idList, callback) {
    Card.find({idList: idList}, callback);
  }
}

module.exports = new ListsController();