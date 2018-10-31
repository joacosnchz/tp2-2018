var mongoose = require('mongoose');
require('./../models/card');
var Card = mongoose.model('card');

class CardsController {
  getAll(callback) {
    Card.find({}, callback);
  }

  getOne(id, callback) {
    Card.findOne({_id: id}, callback);
  }

  remove(id, callback) {
    Card.remove({_id: id}, callback);
  }

  create(card, callback) {
    let card = new Card({
      name: card.name,
      desc: card.desc
    });

    card.save(callback);
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

          oldCard.save(callback);
        }
      }
    })
  }
}

module.exports = new CardsController();