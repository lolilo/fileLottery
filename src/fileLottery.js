var fs = require('fs');
var pathModule = require('path');

var FileLottery = function(path) {
	this.fileNames = this.init(path);
	this.fileNames = FileLottery.shuffleArray(this.fileNames);
	this.fileListLength = this.fileNames.length;
	this.fileListIndex = -1;
};	

FileLottery.prototype = {
	init: function(path) {
		var fileNames; 
		if (fs.lstatSync(path).isDirectory()) {
			fileNames = FileLottery.getContentsOfDirectory(path);
		} else if (fs.lstatSync(path).isFile()) {
			fileName = pathModule.basename(path);
			fileNames = [fileName];
		} else {
			console.log("Path does not lead to a file or directory.");
		}
		return fileNames;
	},

	fileLottery: function() {
    	if (this.fileListLength == 0) {
    		return '';
    	} 
    	return this.nextFile(); 
	},

	nextFile: function() {
		if (this.fileListIndex >= this.fileListLength - 1) {
			this.fileNames = FileLottery.shuffleArray(this.fileNames);
			this.fileListIndex = -1; 
		}
		this.fileListIndex++;
		return this.fileNames[this.fileListIndex];
	}
};

FileLottery.getContentsOfDirectory = function(directoryPath) {
		var blacklist = [".DS_Store"]; // change to hash for better efficienty
		var fileList = fs.readdirSync(directoryPath);
		var finalFileList = [];
		var fileListLength = fileList.length;
		for (var i = 0; i < fileListLength; i++) {
			var currentElement = fileList[i];
			if (!FileLottery.isElementInList(currentElement, blacklist)) {
				finalFileList.push(currentElement);
			}			
		}
		return finalFileList;
	}

FileLottery.isElementInList = function(element, list) {
    for (var i = 0; i < list.length; i++){
        if (element == list[i]){
            return true;
        }
    }
    return false;
}

FileLottery.getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

FileLottery.shuffleArray = function(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var randomNumber = FileLottery.getRandomNumber(0, i);
		    var temp = array[i];
		    array[i] = array[randomNumber];
		    array[randomNumber] = temp;
		}
		return array;
	},

module.exports.FileLottery = FileLottery;
