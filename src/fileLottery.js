var fs = require('fs');

var FileLottery = function(path) {
	this.fileNames = FileLottery.getContentsOfDirectory(path);
	this.fileNames = FileLottery.shuffleArray(this.fileNames);
	this.fileListIndex = -1;
};	

FileLottery.prototype = {
	fileLottery: function() {
    	if (this.fileNames.length == 0) return ""; 
    	if (this.hasNext) {
    		return this.next;
    	}
	},

	hasNext: function() {
		if (this.fileNames.length == 0) {
			return false;
		}
		return true;
	},

	next: function() {
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
