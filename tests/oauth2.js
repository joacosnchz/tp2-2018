var assert = require('assert');
var sinon = require('sinon');
var OAuth2 = require('./../controllers/oauth2');
var mongoose = require('mongoose');
require('./../models/accesstoken');
var AccessToken = mongoose.model('accesstoken');
var jwt = require('jsonwebtoken');

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
});