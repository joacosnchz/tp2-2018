var express = require('express');
var router = express.Router();
var UsersController = require('./../controllers/users');

router.post('/register', (req, res) => {
  let usersController = new UsersController();

  usersController.register(req.body.username, req.body.password).then((user) => {
    user.password = '';
    res.json(user);
  }).catch(err => {
    res.sendStatus(500);
  });
});

router.post('/login', (req, res) => {
  let usersController = new UsersController();

  usersController.login(req.body.username, req.body.password).then(user => {
    res.json(user);
  }).catch(err => {
    res.sendStatus(500);
  }); 
});

module.exports = router;