var StreamTransformer = require('stream-trans4mer');
var dateFormat = require('dateformat');

function prependDate(data, pattern, prepend){
	if(prepend){
		data = dateFormat(pattern) + data;
	}

	return data;
}

module.exports = function(pattern){
	var oldStdout = process.stdout,
		oldStderr = process.stderr,
		timeStdout = true,
		timeStderr = true;

	pattern = pattern || 'yyyy-mm-ddTHH:MM:ssZ ';

	//both of this properties are read-only but configurable
	//that is why we have to delete and assign it again
	delete process.stdout;
	delete process.stderr;

	process.stdout = new StreamTransformer(oldStdout, function(data){
		var dataWithDate = prependDate(data, pattern, timeStdout);

		timeStdout = /\n$/.test(data);

		return dataWithDate;
	});

	process.stderr = new StreamTransformer(oldStderr, function(data){
		var dataWithDate = prependDate(data, pattern, timeStderr);

		timeStderr = /\n$/.test(data);

		return dataWithDate;
	});
};
