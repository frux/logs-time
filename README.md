# logs-time
Prepends timestamp to all your console outputs

## Usage
```js
require('logs-time')('[HH:MM:ss] ');

console.log('test');                 //-> [14:31:53] test
console.error('error');              //-> [14:31:53] error
process.stdout.write('test stdout'); //-> [14:31:53] test stdout
process.stdout.write('test stderr'); //-> [14:31:53] test stderr
```

## Date formats
`logs-time` is using [dateformat](https://github.com/felixge/node-dateformat) module. Therefore it supports dates patterns described [there](http://blog.stevenlevithan.com/archives/date-time-format).
