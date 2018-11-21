var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  name: String,
  desc: String,
  idList: { type: 'ObjectId', ref: 'list' },
  attachments: [{
    url: String,
    name: String
  }]
});

cardSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

cardSchema.set('toJSON', {
  virtuals: true
});

mongoose.model('card', cardSchema);