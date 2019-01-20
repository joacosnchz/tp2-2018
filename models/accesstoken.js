var mongoose = require('mongoose');

var accessTokenSchema = mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
  valid: Boolean // is valid when refresh token has not been used
});

mongoose.model('accesstoken', accessTokenSchema);