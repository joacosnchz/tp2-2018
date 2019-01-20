var mongoose = require('mongoose');
var debug = require('debug')('trello:cardscontroller');
require('./../models/list');
require('./../models/card');

class CardsController {
  constructor(CardModel) {
    if(CardModel) {
      this.Card = CardModel;
    } else {
      this.Card = mongoose.model('card');
    }
  }

  getAll(filter, callback) {
    this.Card.find(filter, callback);
  }

  getOne(id, callback) {
    this.Card.findOne({_id: id}, callback);
  }

  remove(id, callback) {
    this.Card.remove({_id: id}, callback);
  }

  create(card, callback) {
    let newCard = new this.Card({
      name: card.name,
      desc: card.desc,
      idList: card.idList,
      attachments: new Array()
    });

    newCard.save(callback);
  }

  edit(id, card, callback) {
    this.Card.update({_id: id}, {
      $set: {
        name: card.name,
        desc: card.desc,
        idList: card.idList
      }
    }, callback);
  }
}

module.exports = CardsController;