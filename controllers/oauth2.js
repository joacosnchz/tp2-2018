class OAuth2 {
  generateAuthorization(headers) {
    let credentialsBase64 = headers.authorization.replace('Basic ', '');
    let credentialsStr = new Buffer(credentialsBase64, 'base64').toString('ascii');
    let credentialsSplitted = credentialsStr.split(':');
    let username = credentialsSplitted[0];
    let password = credentialsSplitted[1];

    if(username === 'hola' && password === 'hola') {
      return Promise.resolve('123');
    } else {
      return Promise.reject('Authentication error');
    }    
  }

  generateAccessToken(headers) {
    let authorization = headers.authorization.replace('Bearer ', '');

    if(authorization === '123') {
      return Promise.resolve('234');
    } else {
      return Promise.reject('Authentication error');
    }
  }

  authenticate(req, res, next) {
    if(req.query.accessToken === '234') {
      next();
    } else {
      res.sendStatus(401);
    }
  }
}

module.exports = OAuth2;