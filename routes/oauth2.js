var express = require('express');
var router = express.Router();
var OAuth2 = require('./../controllers/oauth2');
var passport = require('passport');

router.post('/authorize', passport.authenticate('local'), (req, res) => {
  let oauth2Controller = new OAuth2();

  oauth2Controller.generateAuthorization().then(auth => {
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