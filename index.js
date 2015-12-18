var StreamTransformer = require('stream-trans4mer');
var dateFormat = require('dateformat');

module.exports = function(pattern){
	var oldStdout = process.stdout,
		oldStderr = process.stderr,
		firstStdout = true,
		firstStderr = true;

	pattern = pattern || 'yyyy-mm-ddTHH:MM:ssZ ';

	delete process.stdout;
	delete process.stderr;

	process.stdout = new StreamTransformer(oldStdout, function(data){
		if(firstStdout){
			data = dateFormat(pattern) + data;
			firstStdout = false;
		}
		return data.replace('\n', '\n' + dateFormat(pattern));
	});

	process.stderr = new StreamTransformer(oldStderr, function(data){
		if(firstStderr){
			data = dateFormat(pattern) + data;
			firstStderr = false;
		}
		return data.replace('\n', '\n' + dateFormat(pattern));
	});
};