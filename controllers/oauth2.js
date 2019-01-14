class OAuth2 {
  generateAuthorization() {
    // save it to database and give it 30 seconds of expiration time
    return Promise.resolve('123');
  }

  authorize(auth) {
    // check if is not expired and if its correct
    if(auth === '123') {
      return Promise.resolve();
    } else {
      return Promise.reject('Authorization not found');
    }
  }

  generateAccessToken() {
    return Promise.resolve('234');
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