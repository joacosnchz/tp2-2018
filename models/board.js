var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
  name: String
});

mongoose.model('board', boardSchema);