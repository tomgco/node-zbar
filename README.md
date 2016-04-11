# Node ZBar

node-zbar is a NodeJS binding to the ZBar QR Code library. Initially this will spawn a child process and monitor the output. But eventually it will be a C++ module.

## Installation

To use node-zbar, you will install the prerequisite of ZBar.
    
Compile from source see

    http://zbar.sourceforge.net/
   
Node-zbar can then be installed via NPM

    npm install zbar


Then, require the module

    var zbar = require('zbar');


## Usage
```js
var Zbar = require('zbar');

zbar = new Zbar(device[, options]);


zbar.stdout.on('data', function(buf) {
  console.log('data scanned : ' + buf.toString());                                                                                                      
});

zbar.stderr.on('data', function(buf) {
    console.log(buf.toString());
});
```
    
Watch for data on device. `device` is a path to a supported webcam device. For example `/dev/video0`

The second argument is optional. The options if provided should be an object. The list of available options are as following:

`width` - scale the width of the sampled image

`height` - scale the width of the sampled image

`dataType` - can be `raw` or `xml`. default is `raw`

You should watch the `stdout` and `stderr` data.

Example:
```js
var Zbar = require('zbar');

zbar = new Zbar('/dev/video0');


zbar.stdout.on('data', function(buf) {
  console.log('data scanned : ' + buf.toString());                                                                                                      
});

zbar.stderr.on('data', function(buf) {
    console.log(buf.toString());
});
```

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
