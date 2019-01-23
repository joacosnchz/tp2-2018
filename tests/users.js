var assert = require('assert');
var sinon = require('sinon');
var UsersController = require('./../controllers/users');
var mongoose = require('mongoose');
require('./../models/user');
var User = mongoose.model('user');
var bcrypt = require('bcrypt');

describe('UsersController tests', () => {
  it('Should login user correctly', done => {
    let findOneFake = sinon.fake.resolves({username: 'SOMEUSER'});
    sinon.replace(User, 'findOne', findOneFake);
    let compareFake = sinon.fake.resolves(true);
    sinon.replace(bcrypt, 'compare', compareFake);
    let usersController = new UsersController(User, bcrypt);

    usersController.login('SOMEUSERNAME', 'SOMEPASSWORD').then(res => {

      sinon.restore();
      assert.equal(res.username, 'SOMEUSER');
      done();
    });
  });

  it('Should reject due to wrong password', done => {
    let findOneFake = sinon.fake.resolves({username: 'SOMEUSER'});
    sinon.replace(User, 'findOne', findOneFake);
    let compareFake = sinon.fake.resolves(false);
    sinon.replace(bcrypt, 'compare', compareFake);
    let usersController = new UsersController(User, bcrypt);

    usersController.login('SOMEUSERNAME', 'SOMEPASSWORD').catch(err => {
      
      sinon.restore();
      assert.equal(err, 'Wrong password');
      done();
    });
  });

  it('Should not found user', done => {
    let findOneFake = sinon.fake.resolves(null);
    sinon.replace(User, 'findOne', findOneFake);
    let usersController = new UsersController(User);

    usersController.login('SOMEUSERNAME', 'SOMEPASSWORD').catch(err => {
      
      sinon.restore();
      assert.equal(err, 'No user found');
      done();
    });
  });

  it('Should find one user by id', done => {
    let UserMock = sinon.mock(User);
    UserMock.expects('findOne').withArgs({_id: 'SOMEID'}).once().resolves('USER');
    let usersController = new UsersController(User);

    usersController.findOneById('SOMEID').then(user => {

      UserMock.verify();
      UserMock.restore();
      assert.equal(user, 'USER');
      done();
    });
  });

  it('Should not find user by id', done => {
    let UserMock = sinon.mock(User);
    UserMock.expects('findOne').withArgs({_id: 'SOMEID'}).once().resolves(null);
    let usersController = new UsersController(User);

    usersController.findOneById('SOMEID').catch(err => {

      UserMock.verify();
      UserMock.restore();
      assert.equal(err, 'No user found');
      done();
    });
  });

  it('Should register new user', done => {
    let bcryptMock = sinon.mock(bcrypt);
    bcryptMock.expects('hash').withArgs('SOMEPASS', 10).once().resolves("HASH");
    let saveFake = sinon.fake.resolves();
    let User = function() {
      this.save = saveFake;
    }
    let usersController = new UsersController(User, bcrypt);

    usersController.register('SOMEUSER', 'SOMEPASS').then(() => {
      bcryptMock.verify();
      bcryptMock.restore();
      sinon.restore();
      assert.equal(saveFake.callCount, 1);
      done();
    });
  });
});