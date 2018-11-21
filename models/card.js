var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  name: String,
  desc: String,
  idList: { type: 'ObjectId', ref: 'list' },
  attachments: [{
    url: String,
    name: String
  }]
});

mongoose.model('card', cardSchema);