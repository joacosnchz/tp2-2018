var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var BoardsController = require('./../controllers/boards');
require('sinon-mongoose');
require('./../models/board');
require('./../models/list');

describe('BoardsController tests', () => {
  var List = mongoose.model('list');
  var Board = mongoose.model('board');

  it('Should find one board by id', done => {
    let BoardMock = sinon.mock(Board);
    BoardMock.expects('findOne').withArgs({_id: "BOARD"}).once().yields(null, 'RESULT');
    let boardsController = new BoardsController(Board, null);

    boardsController.getOne("BOARD", (err, boards) => {
      BoardMock.verify();
      BoardMock.restore();
      assert.equal(boards, "RESULT");
      done();
    });
  });

  it('Should call find lists of a board', done => {
    let spy = sinon.spy(List, "find");
    let boardsController = new BoardsController(null, List);

    boardsController.getAllListsFromBoard('BOARD', (err, lists) => {
      List.find.restore();
      assert.equal(spy.called, true);
      done();
    });
  });
});