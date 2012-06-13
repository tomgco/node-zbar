var Zbar = require('../zbar').createWatcher
  , zbar = new Zbar('/dev/video0')
  ;

zbar.on('data', function(data) {
  console.log(data);
});