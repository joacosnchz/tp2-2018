var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var ListsController = require('./../controllers/lists');
require('sinon-mongoose');
require('./../models/card');
var Card;

describe('ListsController tests', () => {

  before(() => {
    Card = mongoose.model('card');
  });

  it('Should call find cards by list', () => {
    let fake = sinon.fake.yields(null, 'RESULT');
    sinon.replace(Card, 'find', fake);
    let listsController = new ListsController(Card);

    listsController.getAllCardsByListId('LIST', () => {});

    sinon.restore();
    assert.equal(fake.callCount, 1);
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

  it('Should call find cards of list array', () => {
    let fake = sinon.fake.resolves([]);
    sinon.replace(Card, 'find', fake);
    let listsController = new ListsController(Card);

    listsController.getAllCardsInLists('LISTS');

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });

  it('Should find cards of list array', done => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('find').withArgs({idList: {$in: "LISTS"}}).once().resolves('RESULT');
    let listsController = new ListsController(Card);

    listsController.getAllCardsInLists("LISTS").then(cards => {
      CardMock.verify();
      CardMock.restore();
      assert.equal(cards, 'RESULT');
      done();
    });
  });
});