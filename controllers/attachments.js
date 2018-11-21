var debug = require('debug')('trello:attachmentscontroller');
var mongoose = require('mongoose');
require('./../models/card');
var Card = mongoose.model('card');

class AttachmentsController {

  getByCard(id_card, callback) {
    callback();
  }

  addAttachmentToCard(id_card, attachment, callback) {
    /* Card.findOne({_id: id_card}, (err, card) => {
      if(err) {
        debug(err);
        callback(err);
      } else {
        callback(null);
      }
    }); */

    callback(null);
  }

  deleteAttachmentFromCard(id_attachment, callback) {
    callback();
  }
}

module.exports = new AttachmentsController();