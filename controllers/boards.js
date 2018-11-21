var mongoose = require('mongoose');
require('../models/list');
require('../models/card');
require('../models/board');
var Card = mongoose.model('card');
var List = mongoose.model('list');

class BoardController {
  getAllCardsByListByBoardId(idBoard, callback) {
    List.find({ idBoard: idBoard })
      .then(lists => lists.map(list => list._id))
      .then(listsIDs => Card.find({ idList: { $in: listsIDs } }, callback))
  }
}

module.exports = new BoardController();