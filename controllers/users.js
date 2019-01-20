var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
require('./../models/user');
var User = mongoose.model('user');
var debug = require('debug')('trello:userscontroller');

class UsersController {
  register(username, password) {
    return bcrypt.hash(password, 10).then(hash => {
      let user = new User({
        username: username,
        password: hash
      });

      return user.save();
    }).catch(err => {
      debug(err);
      return Promise.reject(err);
    });
  }

  login(username, password) {
    return User.findOne({username: username}).then(user => {
      if(!user) {
        return Promise.reject('No user found');
      } else {
        return bcrypt.compare(password, user.password).then(res => {
          if(res) {
            user.password = '';
            return Promise.resolve(user);
          } else {
            return Promise.reject('Wrong password');
          }
        })
      }
    });
  }

  findOneById(id) {
    return User.findOne({_id: id}).then(user => {
      if(!user) {
        return Promise.reject('No user found');
      } else {
        return Promise.resolve(user);
      }
    });
  }
}

module.exports = UsersController;