var debug = require('debug')('trello:attachmentscontroller');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('./../models/card');
var Card = mongoose.model('card');

class AttachmentsController {
  constructor(CardModel, FileSys) {
    this.endpoint = 'http://localhost:3000/';

    if(CardModel) {
      Card = CardModel;
    }

    if(FileSys) {
      fs = FileSys;
    }
  }

  getByCard(id_card, callback) {
    Card.findOne({_id: id_card}, (err, card) => {
      if(err) {
        debug(err);
        callback('Cannot find card');
      } else {
        callback(null, card.attachments);
      }
    })
  }

  addToCard(id_card, attachment, callback) {
    fs.readFile(attachment.path, (err, data) => {
      if(err) {
        debug(err);
        callback('Cannot read attachment file');
      } else {
        let originalnameParts = attachment.originalname.split('.');
        let extension = originalnameParts[originalnameParts.length-1];
        let relativePath = path.join('uploads', attachment.filename + '.' + extension);
        let filePath = path.join(__dirname.replace('controllers', 'public'), relativePath);

        fs.writeFile(filePath, data, err => {
          if(err) {
            debug(err);
            callback('Cannot write attachment file');
          } else {
            Card.findOne({_id: id_card}, (err, card) => {
              if(err) {
                debug(err);
                callback('Cannot find file');
              } else {
                card.attachments.push({
                  url: this.endpoint + relativePath,
                  name: attachment.filename
                });
                
                card.save(err => {
                  if(err) {
                    debug(err);
                    callback('Error updating card');
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

  deleteFromCard(id_card, id_attachment, callback) {
    Card.findOne({_id: id_card}, (err, card) => {
      if(err) {
        debug(err);
        callback('Cannot find card');
      } else {
        for(let i = card.attachments.length-1;i >= 0;i--) {
          if(card.attachments[i]._id.toString() === id_attachment) {
            let relativePath = card.attachments[i].url.replace(this.endpoint, '');

            card.attachments.splice(i, 1);
            card.save(err => {
              if(err) {
                debug(err);
                callback('Cannot update card');
              } else {
                let filePath = path.join(__dirname.replace('controllers', 'public'), relativePath);

                fs.unlink(filePath, err => {
                  if(err) {
                    debug(err);
                  }

                  callback(null);
                });
              }
            });
            return; // does not allow the control to arrive the callback outside the forloop
          }
        }
        callback(null); // only arrives here if no attachment is found
      }
    })
  }
}

module.exports = AttachmentsController;