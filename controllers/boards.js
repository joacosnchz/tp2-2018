var mongoose = require('mongoose');
require('../models/list');
require('../models/card');
require('../models/board');
var Card = mongoose.model('card');

class BoardsController {

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

  getAllListIdsFromBoard(idBoard) {
    return this.List.find({ idBoard: idBoard }).then(lists => lists.map(list => list._id));
  }
}

module.exports = BoardsController;