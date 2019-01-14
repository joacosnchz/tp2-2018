var express = require('express');
var router = express.Router();
var OAuth2 = require('./../controllers/oauth2');

router.get('/authorize', (req, res) => {
  let oauth2Controller = new OAuth2();

  oauth2Controller.generateAuthorization(req.headers).then(auth => {
    res.send(auth);
  });
});

router.get('/token', (req, res) => {
  let oauth2Controller = new OAuth2();

  oauth2Controller.generateAccessToken(req.headers).then(at => {
    res.send('234');
  });
});

module.exports = router;