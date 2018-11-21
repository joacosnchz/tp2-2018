var mongoose = require('mongoose');
var debug = require('debug')('trello:cardscontroller');
require('./../models/list');
require('./../models/card');
var Card = mongoose.model('card');

class CardsController {
  getAll(filter, callback) {
    Card.find(filter, callback);
  }

  getOne(id, callback) {
    Card.findOne({_id: id}, callback);
  }

  remove(id, callback) {
    Card.remove({_id: id}, callback);
  }

  create(card, callback) {
    let newCard = new Card({
      name: card.name,
      desc: card.desc,
      idList: card.idList,
      attachments: new Array()
    });

    newCard.save(callback);
  }

  edit(id, card, callback) {
    Card.findOne({_id: id}, (err, oldCard) => {
      if(err) {
        callback(err);
      } else {
        if(!oldCard) {
          callback('Card not found');
        } else {
          oldCard.name = card.name;
          oldCard.desc = card.desc;
          oldCard.idList = card.idList;

          oldCard.save(callback);
        }
      }
    })
  }
}

module.exports = new CardsController();