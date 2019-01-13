var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var BoardsController = require('./../controllers/boards');
require('sinon-mongoose');
require('./../models/board');
require('./../models/list');
var Board;
var List;

describe('BoardsController tests', () => {
  before(() => {
    Board = mongoose.model('board');
    List = mongoose.model('list');
  });

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

  it('Should call find lists of a board', () => {
    let fake = sinon.fake.resolves([]);
    sinon.replace(List, 'find', fake);
    let boardsController = new BoardsController(null, List);

    boardsController.getAllListIdsFromBoard('BOARD');

    sinon.restore();
    assert.equal(fake.callCount, 1);
  });

  it('Should find list ids of a board', done => {
    let ListMock = sinon.mock(List);
    ListMock.expects('find').withArgs({idBoard: 'BOARD'}).once().resolves([]);
    let boardsController = new BoardsController(null, List);

    boardsController.getAllListIdsFromBoard('BOARD').then(lists => {
      ListMock.verify();
      ListMock.restore();
      assert.equal(lists.length, 0);
      done();
    });
  });
});