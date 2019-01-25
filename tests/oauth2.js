var assert = require('assert');
var sinon = require('sinon');
var OAuth2 = require('./../controllers/oauth2');
var mongoose = require('mongoose');
require('./../models/accesstoken');
var AccessToken = mongoose.model('accesstoken');
var jwt = require('jsonwebtoken');
var moment = require('moment');

describe('OAuth2 Tests', () => {

  it('Should call create a new access token', () => {
    let saveFake = sinon.fake.resolves();
    let AccessToken = function() {
      this.save = saveFake;
    }
    let oauth2 = new OAuth2(AccessToken);

    oauth2.generateAccessToken();

    assert.equal(saveFake.callCount, 1);
  });

  it('Should create a new access token', done => {
    let signFake = sinon.fake.returns('TOKEN');
    sinon.replace(jwt, 'sign', signFake);
    let saveFake = sinon.fake.resolves();
    let AccessToken = function() {
      this.save = saveFake;
    }
    let oauth2 = new OAuth2(AccessToken, jwt);

    oauth2.generateAccessToken().then(res => {

      sinon.restore();
      assert.equal(signFake.callCount, 2);
      assert.equal(saveFake.callCount, 1);
      assert.equal(res.accessToken, 'TOKEN');
      assert.equal(res.refreshToken, 'TOKEN');
      done();
    });
  });

  it('Should validate refresh token', done => {
    let saveFake = sinon.fake.resolves();
    let accessToken = {
      valid: true,
      save: saveFake
    };
    let findOneFake = sinon.fake.resolves(accessToken);
    sinon.replace(AccessToken, 'findOne', findOneFake);
    let oauth2 = new OAuth2(AccessToken);

    oauth2.validateRefreshToken('TOKEN').then(() => {
      
      sinon.restore();
      assert.equal(findOneFake.callCount, 1);
      assert.equal(saveFake.callCount, 1);
      done();
    }).catch(err => {
      console.log(err);
    });
  });

  it('Should not find access token', done => {
    let findOneFake = sinon.fake.resolves(false);
    sinon.replace(AccessToken, 'findOne', findOneFake);
    let oauth2 = new OAuth2(AccessToken);

    oauth2.validateRefreshToken('TOKEN').catch(err => {
      
      sinon.restore();
      assert.equal(err, 'Access token not found');
      done();
    });
  });

  it('Should authenticate with accessToken', done => {
    let expireDate = moment().add({days: 1});
    let findOneFake = sinon.fake.resolves({
      expiresAt: expireDate
    });
    sinon.replace(AccessToken, 'findOne', findOneFake);
    let oauth2 = new OAuth2(AccessToken);

    oauth2.authenticate('TOKEN').then(at => {
      
      sinon.restore();
      assert.equal(findOneFake.callCount, 1);
      assert.equal(at.expiresAt, expireDate);
      done();
    });
  });

  it('Should not authenticate: token expired', done => {
    let expireDate = moment().subtract({days: 1});
    let findOneFake = sinon.fake.resolves({
      expiresAt: expireDate
    });
    sinon.replace(AccessToken, 'findOne', findOneFake);
    let oauth2 = new OAuth2(AccessToken);

    oauth2.authenticate('TOKEN').catch(err => {
      
      sinon.restore();
      assert.equal(findOneFake.callCount, 1);
      assert.equal(err, 'Access Token expired');
      done();
    });
  });

  it('Should not authenticate: token not found', done => {
    let findOneFake = sinon.fake.resolves(false);
    sinon.replace(AccessToken, 'findOne', findOneFake);
    let oauth2 = new OAuth2(AccessToken);

    oauth2.authenticate('TOKEN').catch(err => {
      
      sinon.restore();
      assert.equal(findOneFake.callCount, 1);
      assert.equal(err, 'Access Token not found');
      done();
    });
  });
});