var fs = require('fs');

var cache = {}

function readFiles (fileName) {
	console.log(fileName)
	fs.readFile(fileName + '.js', 'utf8', function(err, contents) {
	    var hasRequire = /require/.test(contents)
	    // var bundle = new Function ('var modules = {}; var blah = true');
	    // Redefined what require is? Pass it into the new function
	    // function require (path) {
	    // 	console.log('cache ', cache[path])
	    // }
	    // contents + require
	    // console.log(contents + require + cache)
	    cache[fileName] = new Function (contents)
	    if (hasRequire) {
	    	var matched = contents.match(/require((.*))/)[1]
	    	var path = matched.match(/'([^']*)'/)[1]
	    	readFiles(path)
	    } else {
	    	createFunction()
	    	fs.writeFile('test.js', cache)
	    }
	});
}

function createFunction() {
	return (function(){
		var modules = {};
		var uninitializedModules = {};
		console.log(cache)
		Object.keys(cache).forEach(function(file) {
			modules[file] = cache[file]()
		})
		// console.log('new Modules: ', modules)
	})()
}


readFiles('./foo');