var StreamTransformer = require('stream-trans4mer');
var dateFormat = require('dateformat');

module.exports = function(pattern){
	var oldStdout = process.stdout,
		oldStderr = process.stderr;

	pattern = pattern || 'yyyy-mm-ddTHH:MM:ssZ ';

	delete process.stdout;
	delete process.stderr;

	process.stdout = new StreamTransformer(oldStdout, function(data){
		return dateFormat(pattern) + data;
	});

	process.stderr = new StreamTransformer(oldStderr, function(data){
		return dateFormat(pattern) + data;
	});
};