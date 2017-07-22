var fs = require('fs');
var util = require('util');
var log_stdout = process.stdout;

module.exports = function(dirname) {
  var log_file = fs.createWriteStream(dirname, {flags : 'w'});

  console.log = function(d) { //
    log_file.write(new Date() + ' :\n' + util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };
}
