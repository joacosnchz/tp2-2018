var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var AttachmentsController = require('./../controllers/attachments');
var fs = require('fs');
require('./../models/card');
var Card = mongoose.model('card');

describe('AttachmentsController tests', () => {

  it('Should add attachment to a card', (done) => {
    let readFake = sinon.fake.yields(null, 'RESULT1');
    sinon.replace(fs, 'readFile', readFake);
    let writeFake = sinon.fake.yields(null);
    sinon.replace(fs, 'writeFile', writeFake);
    let saveCardFake = sinon.fake.yields(null);
    let findOneCardFake = sinon.fake.yields(null, {
      attachments: [],
      save: saveCardFake
    });
    sinon.replace(Card, 'findOne', findOneCardFake);
    var attachmentsController = new AttachmentsController(Card, fs);

    let fakeAttachment = {
      path: 'somefakepath',
      originalname: 'randomgeneratedname',
      filename: 'somerealname.jpg'
    };
    attachmentsController.addToCard('SOMEID', fakeAttachment, err => {
      
      sinon.restore();
      assert.equal(err, null);
      assert.equal(readFake.callCount, 1);
      assert.equal(writeFake.callCount, 1);
      assert.equal(findOneCardFake.callCount, 1);
      assert.equal(saveCardFake.callCount, 1);
      done();
    });
  });

  it('Should delete existing attachment from a card', (done) => {
    let saveCardFake = sinon.fake.yields(null);
    let findOneCardFake = sinon.fake.yields(null, {
      attachments: [
        {_id: 'SOMEID2', url: ''}
      ],
      save: saveCardFake
    });
    sinon.replace(Card, 'findOne', findOneCardFake);
    let unlinkFake = sinon.fake.yields(null);
    sinon.replace(fs, 'unlink', unlinkFake);
    var attachmentsController = new AttachmentsController(Card, fs);

    attachmentsController.deleteFromCard('SOMEID', 'SOMEID2', err => {

      sinon.restore();
      assert.equal(err, null);
      assert.equal(findOneCardFake.callCount, 1);
      assert.equal(saveCardFake.callCount, 1);
      assert.equal(unlinkFake.callCount, 1);
      done();
    });
  });

  it('Should delete non existing attachment from a card', (done) => {
    let saveCardFake = sinon.fake.yields(null);
    let findOneCardFake = sinon.fake.yields(null, {
      attachments: [],
      save: saveCardFake
    });
    sinon.replace(Card, 'findOne', findOneCardFake);
    let unlinkFake = sinon.fake.yields(null);
    sinon.replace(fs, 'unlink', unlinkFake);
    var attachmentsController = new AttachmentsController(Card, fs);

    attachmentsController.deleteFromCard('SOMEID', 'SOMEID2', err => {

      sinon.restore();
      assert.equal(err, null);
      assert.equal(findOneCardFake.callCount, 1);
      assert.equal(saveCardFake.callCount, 0);
      assert.equal(unlinkFake.callCount, 0);
      done();
    });
  });

  it('Should return card attachments', (done) => {
    let card = new Card();
    let fake = sinon.fake.yields(null, card)
    sinon.replace(Card, 'findOne', fake);
    let fakeAttachments = sinon.fake.returns('ATTACHMENTS');
    sinon.replaceGetter(card, 'attachments', fakeAttachments);
    var attachmentsController = new AttachmentsController(Card);

    attachmentsController.getByCard('SOMEID', (err, attachments) => {
      
      sinon.restore();
      assert.equal(err, null);
      assert.equal(fake.callCount, 1);
      assert.equal(fakeAttachments.callCount, 1);
      assert.equal(attachments, 'ATTACHMENTS');
      done();
    });
  });
});