var child_process = require('child_process')
  ;

module.exports.createWatcher = function(device, options) {

  options = options || {};
  options.dataType = options.dataType || 'raw';
  options.width = options.width || 800;
  options.height = options.height || 600;
  options.whiteList = options.whiteList || false; // when true used in conjunction with symbology to whitelist single symbologies
  options.symbology = options.symbology || false; // array of options eg: [ 'qrcode.enable', 'isbn13.disable' ]
  
  if (options.whiteList) {
    zbarArguments.push('-Sdisable');
  }
  
  if (Array.isArray(options.symbology)) {
    for (var i = 0; i < options.symbology.length; i++) {
      zbarArguments.push('-S' + options.symbology[i]);
    } 
  }

  if (options.height / options.width !== 0.75) {
    throw new Error('Aspect ratio must be 4:3');
  }

  var zbarArguments =
      [ '--prescale=' + options.width + 'x' + options.height
      , '--nodisplay'
      ]
    , zbar
    ;

  // Push data type onto arguments
  zbarArguments.push((options.dataType === 'xml') ? '--xml' : '--' + options.dataType);

  // add device as last element
  zbarArguments.push(device);

  // spawn the child process
  zbar = child_process.spawn('zbarcam'
    , zbarArguments
    );

  return zbar;
};