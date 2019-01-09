var mongoose = require('mongoose');
require('./../models/list');
require('./../models/card');
var Card = mongoose.model('card');

class ListsController {

  constructor(CardModel) {
    this.Card = CardModel;
  }

  getAllCardsByListId(idList, callback) {
    this.Card.find({idList: idList}, callback);
  }
}

module.exports = ListsController;