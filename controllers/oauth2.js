class OAuth2 {
  generateAuthorization() {
    return Promise.resolve('123');
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