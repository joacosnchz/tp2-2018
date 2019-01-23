var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var CardsController = require('./../controllers/cards');
require('sinon-mongoose');
require('./../models/card');
var Card = mongoose.model('card');

describe('CardsController tests', () => {
  it('Should call find all cards', () => {
    let fake = sinon.fake();
    sinon.replace(Card, 'find', fake);
    let cardsController = new CardsController(Card);

    cardsController.getAll({}, () => { });

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });

  it('Should find all cards', (done) => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('find').withArgs({filter: 'FILTER'}).once().yields(null, 'RESULT');
    let cardsController = new CardsController(Card);

    cardsController.getAll({filter: 'FILTER'}, (err, cards) => {
      
      CardMock.verify();
      CardMock.restore();
      assert.equal(err, null);
      assert.equal(cards, 'RESULT');
      done();
    });
  });

  it('Should call find one card', () => {
    let fake = sinon.fake();
    sinon.replace(Card, 'findOne', fake);
    let cardsController = new CardsController(Card);

    cardsController.getOne('SOMEID', () => {});

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });

  it('Should find one card', done => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('findOne').withArgs({_id: 'SOMEID'}).once().yields(null, 'RESULT');
    let cardsController = new CardsController(Card);

    cardsController.getOne('SOMEID', (err, card) => {
      
      CardMock.verify();
      CardMock.restore();
      assert.equal(err, null);
      assert.equal(card, 'RESULT');
      done();
    });
  });

  it('Should call remove one card', () => {
    let fake = sinon.fake();
    sinon.replace(Card, 'remove', fake);
    let cardsController = new CardsController(Card);

    cardsController.remove('SOMEID', () => {});

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });

  it('Should remove one card', (done) => {
    let CardMock = sinon.mock(Card);
    CardMock.expects('remove').withArgs({_id: "SOMEID"}).once().yields(null);
    let cardsController = new CardsController(Card);

    cardsController.remove('SOMEID', err => {

      CardMock.verify();
      CardMock.restore();
      assert.equal(err, null);
      done();
    });
  });

  it('Should call save card', () => {
    let saveFake = sinon.fake();
    let Card = function() {
      this.save = saveFake;
    }
    let cardsController = new CardsController(Card);

    cardsController.create({name: '', desc: '', idList: ''}, () => {});

    sinon.restore();
    assert.equal(saveFake.callCount, 1);
  });

  it('Should call update card', () => {
    let fake = sinon.fake();
    sinon.replace(Card, 'update', fake);
    let cardsController = new CardsController(Card);

    cardsController.edit('SOMEID', () => {});

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });
});