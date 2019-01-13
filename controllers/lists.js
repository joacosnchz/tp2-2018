var mongoose = require('mongoose');
require('./../models/list');
require('./../models/card');

class ListsController {

  constructor(CardModel) {
    if(CardModel) {
      this.Card = CardModel;
    } else {
      this.Card = mongoose.model('card');
    }
  }

  getAllCardsByListId(idList, callback) {
    this.Card.find({idList: idList}, callback);
  }

  getAllCardsInLists(lists) {
    return this.Card.find({ idList: { $in: lists } });
  }
}

module.exports = ListsController;