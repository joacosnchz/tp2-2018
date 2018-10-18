var mongoose = require('mongoose');
require('./../models/card');
var Card = mongoose.model('card');

class CardsController {
  getAll(callback) {
    Card.find({}, callback);
  }
}

module.exports = new CardsController();