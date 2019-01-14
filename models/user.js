var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

mongoose.model('user', userSchema);