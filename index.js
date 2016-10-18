var fs = require('fs');

var cache = {}



function readFiles (fileName) {
	fs.readFile('app/' + fileName, 'utf8', function(err, contents) {
	    console.log(contents);
	    var hasRequire = /require/.test(contents)
	    // console.log(contents.split("\n"))
	    var bundle = new Function ('var modules = {}; var blah = true');
	    if (hasRequire) {
	    	var matched = contents.match(/require((.*))/)[1]
	    	var path = matched.match(/'([^']*)'/)[1]
	    	cache[fileName] = contents
	    	readFiles(path.toString())
	    }
	    console.log(cache)
	});
}


readFiles('foo.js');