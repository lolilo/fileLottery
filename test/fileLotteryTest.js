'use strict';

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var FileLottery = require('../src/fileLottery.js').FileLottery;
var FILE_PATH = (__dirname + "/../src");

suite('fileLottery', function() {

  test( 'Return empty string for empty directory', function() {
    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
    stub.withArgs(FILE_PATH).returns([]);
    var lottery = new FileLottery(FILE_PATH); 
    
    expect(lottery.fileLottery(FILE_PATH)).to.equal('');
    stub.restore();
  });
    
  test('Return filename string for directory with one file', function() {

    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
    stub.withArgs(FILE_PATH).returns(['test.txt']);
    var lottery = new FileLottery(FILE_PATH); 
    
    expect(lottery.fileLottery(FILE_PATH)).to.equal('test.txt');
    stub.restore();
  });

  // test('Return random filename for directory with more than one files', function() {
  //   var lottery = new FileLottery(FILE_PATH);    
  //   lottery.getContentsOfDirectory = sinon.stub();
  //   lottery.getContentsOfDirectory.withArgs(FILE_PATH).returns(['1.txt', '2.txt', '4.txt']);

  //   lottery.getRandomIndex = sinon.stub();  
  //   lottery.getRandomIndex.returns(0);
    
  //   expect(lottery.fileLottery(FILE_PATH)).to.equal('1.txt');
  // });
});

suite('getContentsOfDirectory', function() {
  test('Return the content of the directory as an array of strings', function(){
    // var lottery = new FileLottery(FILE_PATH);
    expect(FileLottery.getContentsOfDirectory(FILE_PATH)).to.deep.equal(['fileLottery.js']);
  }); 
});

suite('getRandomIndex', function() {
  test('Return 0 for one-element array', function(){
    var lottery = new FileLottery(FILE_PATH);
    expect(lottery.getRandomIndex([0])).to.equal(0);
  }); 

  test('Return random index from array', function(){
    var lottery = new FileLottery(FILE_PATH);
    expect(0 <= lottery.getRandomIndex([0, 1, 2, 3, 4]) && lottery.getRandomIndex([0, 1, 2, 3, 4]) <= 4).to.be.true;
  }); 
});

suite('fileLottery.hasNext', function() {
  test('Return true if collection hasnt been exhausted', function(){
    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
    stub.withArgs(FILE_PATH).returns(['1.txt', '2.txt', '4.txt']);
    var lottery = new FileLottery(FILE_PATH); 

    expect(lottery.hasNext()).to.be.true;
    stub.restore();
  });

  test('Return false if collection has zero elements', function(){
    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
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

