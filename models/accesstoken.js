var mongoose = require('mongoose');

var accessTokenSchema = mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
  valid: Boolean
});

mongoose.model('accesstoken', accessTokenSchema);