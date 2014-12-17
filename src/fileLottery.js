var fs = require('fs');

var FileLottery = function(path) {
	this.fileNames = FileLottery.getContentsOfDirectory(path);
};	

FileLottery.prototype = {
	fileLottery: function() {
    	if (this.fileNames.length == 0) return ""; 
    	return this.fileNames[this.getRandomIndex(this.fileNames)];
	},

	getRandomIndex: function(array) {
    	return Math.floor(Math.random()*array.length);
	},

	hasNext: function() {
		if (this.fileNames.length == 0) {
			return false;
		}
		return true;
	},

	next: function() {
		
	}
};

FileLottery.getContentsOfDirectory = function(directoryPath) {
		var blacklist = [".DS_Store"]; // change to hash for better efficienty
		var fileList = fs.readdirSync(directoryPath);
		var finalFileList = [];
		var fileListLength = fileList.length;
		for (var i = 0; i < fileListLength; i++) {
			var currentElement = fileList[i];
			if (!isElementInList(currentElement, blacklist)) {
				finalFileList.push(currentElement);
			}			
		}
		return finalFileList;
	}

var isElementInList = function(element, list) {
    for (var i = 0; i < list.length; i++){
        if (element == list[i]){
            return true;
        }
    }
    return false;
}


module.exports.FileLottery = FileLottery;
