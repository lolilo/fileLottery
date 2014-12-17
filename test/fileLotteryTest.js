'use strict';

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var FileLottery = require('../src/fileLottery.js').FileLottery;
var FILE_PATH = (__dirname + "/../src");

suite('fileLottery', function() {

  // test('Return empty string for empty directory', function() {
  //   var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
  //   stub.withArgs(FILE_PATH).returns([]);
  //   var lottery = new FileLottery(FILE_PATH); 
    
  //   expect(lottery.fileLottery(FILE_PATH)).to.equal('');
  //   stub.restore();
  // });
    
  // test('Return filename string for directory with one file', function() {

  //   var stub = sinon.stub(FileLottery, 'getContentsOfDirectory');
  //   stub.withArgs(FILE_PATH).returns(['test.txt']);
  //   var lottery = new FileLottery(FILE_PATH); 
    
  //   expect(lottery.fileLottery(FILE_PATH)).to.equal('test.txt');
  //   stub.restore();
  // });

  // test('Return random filename for directory with more than one files', function() {
  //   var lottery = new FileLottery(FILE_PATH);    
  //   lottery.getContentsOfDirectory = sinon.stub();
  //   lottery.getContentsOfDirectory.withArgs(FILE_PATH).returns(['1.txt', '2.txt', '4.txt']);

  //   lottery.getRandomIndex = sinon.stub();  
  //   lottery.getRandomIndex.returns(0);
    
  //   expect(lottery.fileLottery(FILE_PATH)).to.equal('1.txt');
  // });
});

suite('isElementInList', function() {
  test('Return true if element is in list', function(){
    assert.equal(true, FileLottery.isElementInList("y", ["y", "a"]));
  }); 
  test('Return false if element is not in list', function(){
    assert.equal(false, FileLottery.isElementInList("y", ["no", "a"]));
  });
});

suite('getContentsOfDirectory', function() {
  test('Return the content of the directory as an array of strings', function(){
    expect(FileLottery.getContentsOfDirectory(FILE_PATH)).to.deep.equal(['fileLottery.js']);
  }); 
});

suite('getRandomNumber', function() {
  test('Return an integer between min and max', function() {
    assert(FileLottery.getRandomNumber(1, 10) <= 10);
    assert(FileLottery.getRandomNumber(1, 10) >= 1);
  });
});

suite('shuffleArray', function() {
  test('Return a shuffledArray', function() {
    assert(FileLottery.shuffleArray([1, 2, 3, 4]).length == 4);
    assert(FileLottery.shuffleArray([]).length == 0);
  });
});

suite('fileLottery.hasNext', function() {
  test('Return true if collection hasnt been exhausted', function(){
    var stub = sinon.stub(FileLottery, 'getContentsOfDirectory');
    stub.withArgs(FILE_PATH).returns(['1.txt', '2.txt', '4.txt']);
    var lottery = new FileLottery(FILE_PATH); 

    expect(lottery.hasNext()).to.be.true;
    stub.restore();
  });

  test('Return false if collection has zero elements', function(){
    var stub = sinon.stub(FileLottery, 'getContentsOfDirectory');
    stub.withArgs(FILE_PATH).returns([]);
    var lottery = new FileLottery(FILE_PATH); 

    expect(lottery.hasNext()).to.be.false;
    stub.restore();
  });

  test('Return false if collection has been exhausted', function(){
    // var lottery = new FileLottery(FILE_PATH);
    // lottery.getContentsOfDirectory = sinon.stub();
    // lottery.getContentsOfDirectory.returns(['1.txt', '2.txt', '4.txt']);

    // var randomElement1 = lottery.next();
    // var randomElement2 = lottery.next();
    // var randomElement3 = lottery.next();

    // expect(lottery.hasNext()).to.be.false;
  });
});

