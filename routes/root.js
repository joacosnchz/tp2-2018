var express = require('express');
var router = express.Router();
var OAuth2 = require('../controllers/oauth2');
var passport = require('passport');

router.get('/oauth2/token', (req, res) => {
  let oauth2Controller = new OAuth2();

  oauth2Controller.generateAccessToken().then(data => {
    res.json(data);
  });
});

router.use(passport.authenticate('token'));

module.exports = router;