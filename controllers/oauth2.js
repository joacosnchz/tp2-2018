var jwt = require('jsonwebtoken');
var config = require('config');
var moment = require('moment');

/* 
* Using Implicit Grant Type described in: https://tools.ietf.org/html/rfc6749#section-1.3.2
*/
class OAuth2 {
  generateAccessToken() {
    // E HH:mm:ss:SSS day week and exact time with fractions of seconds
    let accessToken = jwt.sign({at: moment().format('EHHmmssSSS')}, config.get('jwtSecret'));
    let refreshToken = jwt.sign({rt: moment().format('EHHmmssSSS')}, config.get('jwtSecret'));
    let expires = moment().add({hours: 1});

    let res = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    return Promise.resolve(res);
  }

  refreshAccessToken(refresh) {
    
  }

  authenticate(token) {
    // if access token ist correct and not expired: resolve and renew refresh token
    // if access token is not found: reject
    // if access token is expired: client must ask for a new access token presenting last refresh token
    // check if its correct and if its not expired, if its not renew refresh token
    // if its expired, check if refresh token is correct and change it with refresh token 
    // if refresh token is not correct reject authentication
    if(token === '234') {
      return Promise.resolve();
    } else {
      return Promise.reject('Access Token not found');
    }
  }
}

module.exports = OAuth2;