// var http = require('http');
var request = require('request');
// const url = require('url');
//var dataQueryUrl = `http://api.avatardata.cn/ChengYu/Search?key=${apikey}&keyWord=`;

function request(key, word, cb) {
  // const dataUrl = url.parse(`http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`);

// Set the headers
  var headers = {
    // 'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
  }

// Configure the request
  var options = {
    url: `http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`,
    method: 'POST',
    headers: headers,
  }

// Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body);
      cb(body);
    }
  })

  // console.log(dataUrl);
  // http.get(dataUrl, (res) => {
  //   console.log(res);
  //   const { statusCode } = res;
  //   const contentType = res.headers['content-type'];
  //
  //   let error;
  //   if (statusCode !== 200) {
  //     error = new Error('Request Failed.\n' +
  //       `Status Code: ${statusCode}`);
  //   } else if (!/^application\/json/.test(contentType)) {
  //     error = new Error('Invalid content-type.\n' +
  //       `Expected application/json but received ${contentType}`);
  //   }
  //   if (error) {
  //     console.error(error.message);
  //     // consume response data to free up memory
  //     res.resume();
  //     return;
  //   }
  //   res.setEncoding('utf8');
  //   let rawData = '';
  //   res.on('data', (chunk) => { rawData += chunk; });
  //   res.on('end', () => {
  //     try {
  //       const parsedData = JSON.parse(rawData);
  //       console.log(parsedData);
  //       cb(parsedData);
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   });
  // }).on('error', (e) => {
  //     console.error(`Got error: ${e.message}`);
  // });
}

module.exports = request;