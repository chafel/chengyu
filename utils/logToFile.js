var fs = require('fs');
var util = require('util');
var log_stdout = process.stdout;

module.exports = function(dirname) {
  // var log_file = fs.createWriteStream(dirname, {flags : 'w'});

  global.console.log = function() { //
    // log_file.write(new Date() + ' :\n' + util.format.apply(null, arguments) + '\n');
    var data = new Date() + ' :\n' + util.format.apply(null, arguments) + '\n';
    fs.appendFile(dirname, data, function (err) {
      if (err) throw err;
    });

    log_stdout.write(util.format.apply(null, arguments) + '\n');
  };

  console.error = console.log;
}
