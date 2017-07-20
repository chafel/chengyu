var http = require('http');
//var dataQueryUrl = `http://api.avatardata.cn/ChengYu/Search?key=${apikey}&keyWord=`;

function request(key, word, callback) {
  var options = {
    host: 'http://api.avatardata.cn',
    path: `/ChengYu/Search?key=${key}&keyWord=${word}`,
    port: '80',
    method: 'GET'
  };

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      callback(str);
    });
  }

  var req = http.request(options, callback);
  //This is the data we are posting, it needs to be a string or a buffer
  // req.write(JSON.stringify({
  //
  // }));
  req.end();
}

module.exports = request;