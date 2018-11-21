var debug = require('debug')('trello:attachmentscontroller');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('./../models/card');
var Card = mongoose.model('card');

class AttachmentsController {

  getByCard(id_card, callback) {
    callback();
  }

  addToCard(id_card, attachment, callback) {
    fs.readFile(attachment.path, (err, data) => {
      if(err) {
        debug(err);
        callback(err);
      } else {
        let originalnameParts = attachment.originalname.split('.');
        let extension = originalnameParts[originalnameParts.length-1];
        let relativePath = path.join('uploads', attachment.filename + '.' + extension);
        let filePath = path.join(__dirname.replace('controllers', 'public'), relativePath);

        fs.writeFile(filePath, data, err => {
          if(err) {
            debug(err);
            callback(err);
          } else {
            Card.findOne({_id: id_card}, (err, card) => {
              if(err) {
                debug(err);
                callback(err);
              } else {
                card.attachments.push({
                  url: 'http://localhost:3000/' + relativePath,
                  name: attachment.filename
                });
                
                card.save(err => {
                  if(err) {
                    debug(err);
                    callback(err);
                  } else {
                    callback(null);
                  }
                });
              }
            }); 
          }
        });
      }
    });
  }

  deleteFromCard(id_attachment, callback) {
    callback();
  }
}

module.exports = new AttachmentsController();