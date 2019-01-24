var jwt = require('jsonwebtoken');
var config = require('config');
var moment = require('moment');
var debug = require('debug')('trello:oatuh2controller');
var mongoose = require('mongoose');
require('./../models/accesstoken');
var AccessToken = mongoose.model('accesstoken');

/* 
* Using Resource Owner Password Credentials Grant Type described in: https://tools.ietf.org/html/rfc6749#section-1.3.3
* and detailed in: https://tools.ietf.org/html/rfc6749#section-4.3 
*/
class OAuth2 {
  constructor(AccessTokenModel, jwtDep) {
    if(AccessTokenModel) {
      AccessToken = AccessTokenModel;
    }

    if(jwtDep) {
      jwt = jwtDep;
    }
  }
  
  generateAccessToken() {
    let expires_in = 3600;

    // E HH:mm:ss:SSS day week and exact time with fractions of seconds
    let accessToken = jwt.sign({at: moment().format('EHHmmssSSS')}, config.get('jwtSecret'));
    let refreshToken = jwt.sign({rt: moment().format('EHHmmssSSS')}, config.get('jwtSecret'));
    let expires = moment().add({seconds: expires_in});

    let createdTokens = new AccessToken({
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: expires,
      valid: true
    });

    let res = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      token_type: 'generated',
      expires_in: expires_in
    };

    return createdTokens.save().then(() => {
      return Promise.resolve(res);
    });
  }

  refreshAccessToken(refresh) {
    return AccessToken.findOne({refreshToken: refresh}).then(accessToken => {
      if(accessToken && accessToken.valid) {
        accessToken.valid = false;
        accessToken.save();

        return this.generateAccessToken();
      } else {
        return Promise.reject('Access token not found');
      }
    });
  }

  authenticate(token) {
    return AccessToken.findOne({accessToken: token}).then(accessToken => {
      if(accessToken) {
        if(moment().isBefore(accessToken.expiresAt)) {
          return Promise.resolve(accessToken);
        } else {
          return Promise.reject('Access Token expired');
        }
      } else {
        return Promise.reject('Access Token not found');
      }
    });
  }
}

module.exports = OAuth2;