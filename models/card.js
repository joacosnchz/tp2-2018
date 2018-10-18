var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  name: String,
  desc: String,
  // idList: { type: 'ObjectId', ref: 'list' }
});

mongoose.model('card', cardSchema);