var events = require('events')
  , child_process = require('child_process')
  ;

module.exports.createWatcher = function(device, options) {

  options = options || {};
  options.dataType = options.dataType || 'raw';
  options.width = options.width || 800;
  options.height = options.height || 600;

  if (options.height / options.width !== 0.75) {
    throw new Error('Aspect ratio must be 4:3');
  }

  var self = new events.EventEmitter()
    , zbarArguments =
      [ '--prescale=' + options.width + 'x' + options.height
      , '--nodisplay'
      ]
    , zbar
    ;

  // Push data type onto arguments
  zbarArguments.push((options.dataType !== 'xml') ? '--xml' : '--' + options.dataType);

  // add device as last element
  zbarArguments.push(device);

  // spawn the child process
  zbar = child_process.spawn('zbarcam'
    , zbarArguments
    );

  zbar.stdout.on('data', function(data) {
      self.emit('data', data);
  });

  zbar.stderr.on('data', function(data) {
    self.emit('error', new Error(data.toString()));
  });

  zbar.on('exit', function(code) {
    if(code === 0) {
      self.emit('end');
    } else {
      self.emit('error', new Error('ZBar has closed unexpectedly.'));
    }
  });

  return self;
};