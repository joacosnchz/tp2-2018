var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
  name: String,
  idBoard: {type: 'ObjectId', ref: 'board'}
});

mongoose.model('list', listSchema);