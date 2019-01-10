var mongoose = require('mongoose');
require('../models/list');
require('../models/card');
require('../models/board');
var Card = mongoose.model('card');

class BoardController {
  constructor(Board, List) {
    if(Board) {
      this.Board = Board;
    } else {
      this.Board = mongoose.model('board');
    }

    if(List) {
      this.List = List;
    } else {
      this.List = mongoose.model('list');
    }
  }

  getOne(idBoard, callback) {
    this.Board.findOne({_id: idBoard}, callback);
  }

  getAllListsFromBoard(idBoard, callback) {
    this.List.find({ idBoard: idBoard })
      .then(lists => lists.map(list => list._id))
      .then(listsIDs => callback(null, listsIDs))
      .catch(err => callback(err, null));
  }

  getAllCardsByListByBoardId(idBoard, callback) {
    this.List.find({ idBoard: idBoard })
      .then(lists => lists.map(list => list._id))
      .then(listsIDs => Card.find({ idList: { $in: listsIDs } }, callback))
  }
}

module.exports = BoardController;