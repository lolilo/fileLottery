var fileSystem = require('fs');

var FileLottery = function(path) {
//	this.path = path;
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

FileLottery.getContentsOfDirectory = function(path) {
		return fileSystem.readdirSync(path);
	},


module.exports.FileLottery = FileLottery;
