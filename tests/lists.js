var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var ListsController = require('./../controllers/lists');
require('sinon-mongoose');
require('./../models/card');

describe('ListsController tests', () => {
  var Card = mongoose.model('card');
  var CardMock = sinon.mock(Card);

  it('Should call find on cards model', done => {
    let fake = {
      find: function(params, callback) {
        callback(null, 'RESULT');
      }
    };

    let listsController = new ListsController(fake);

    listsController.getAllCardsByListId('LIST', (err, cards) => {
      assert.equal(cards, 'RESULT');
      done();
    });
  });
});