var Zbar = require('../zbar')
  , zbar = new Zbar('/dev/video0')
  ;

zbar.on('data', function(data) {
  console.log(data);
});