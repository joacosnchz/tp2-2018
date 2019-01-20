var express = require('express');
var router = express.Router();
var OAuth2 = require('../controllers/oauth2');
var passport = require('passport');

router.post('/token', passport.authenticate('local'), (req, res) => {
  if(req.body.grant_type === 'password') {
    let oauth2Controller = new OAuth2();

    oauth2Controller.generateAccessToken().then(data => {
      res.json(data);
    }).catch(err => {
      console.log('err');
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/refresh', (req, res) => {
  if(req.body.grant_type === 'refresh_token') {
    let oauth2Controller = new OAuth2();

    oauth2Controller.refreshAccessToken(req.body.refresh_token).then(data => {
      res.json(data);
    }).catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;