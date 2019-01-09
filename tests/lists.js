var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var ListsController = require('./../controllers/lists');
require('sinon-mongoose');
require('./../models/card');

describe('ListsController tests', () => {
  var Card = mongoose.model('card');

  it('Should call find on cards model', done => {
    let spi = sinon.spy(Card, "find");
    let listsController = new ListsController(Card);

    listsController.getAllCardsByListId('LIST', (err, cards) => {
      Card.find.restore();
      
      assert.equal(spi.called, true);
      done();
    });
  });

  it('Should find all cards by list', done => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('find').withArgs({idList: 'LIST'}).once().yields(null, 'RESULT');

    let listsController = new ListsController(Card);

    listsController.getAllCardsByListId('LIST', (err, cards) => {
      CardMock.verify(); // verifies expectations
      CardMock.restore(); // restores all overriden methods and properties

      assert.equal(err, null);
      assert.equal(cards, 'RESULT');
      done();
    });
  });

  it('Should return error finding all cards by list', done => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('find').withArgs({idList: 'LIST'}).once().yields('ERROR', null);
    let listsController = new ListsController(Card);

    listsController.getAllCardsByListId('LIST', (err, cards) => {
      CardMock.verify();
      CardMock.restore();

      assert.equal(err, 'ERROR');
      done();
    });
  });
});