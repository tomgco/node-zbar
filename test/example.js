var Zbar = require('../zbar')
  , zbar = new Zbar('/dev/video0')
  ;

zbar.on('data', function(buf) {
  console.log(buf.toString());
});

zbar.on('err', function(buf) {
  console.log(buf.toString());
});