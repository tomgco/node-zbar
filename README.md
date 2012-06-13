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

    zbar.watch(device, [options], listener)
    
Watch for data on device. `device` is a path to a supported webcam device. For example `/dev/video0`

The second argument is optional. The options if provided should be an object. The list of available options are as following:

`width` - scale the width of the sampled image

`height` - scale the width of the sampled image

`dataType` - can be `raw` or `xml`. default is `raw`

The listener callback gets two arguments (error, data). Data is the data returned from a barcode.

Example:

    zbar.watch('/dev/video0', function (event) {
      console.log('event is: ' + event);
    });

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)