var request = require('request');

module.exports = function (key, word, cb) {
  const dataUrl = `http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`;

  request.post({
    url: 'http://api.avatardata.cn/ChengYu/Search',
    form: {
      key,
      keyWord: word
    }
  }, function(error, response, body) {
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      response.resume();
      return;
    }
    cb(body);
  })
    // .on('response', function (response) {
    //   console.log(response.statusCode);
    //   console.log(response.headers['content-type'])
    //   console.log(response.headers['host']);
    //   console.log(response.headers['from']);
    //
    //   let error;
    //   if (response.statusCode !== 200) {
    //     error = new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`);
    //   }
    //   if (error) {
    //     console.error(error.message);
    //     // consume response data to free up memory
    //     response.resume();
    //     return;
    //   }
    //
    //   response.setEncoding('utf8');
    //   let rawData = '';
    //   response.on('data', (chunk) => { rawData += chunk; });
    //   response.on('end', () => {
    //     try {
    //       const parsedData = JSON.parse(rawData);
    //       console.log(parsedData);
    //       cb(parsedData);
    //     } catch (e) {
    //       console.error(e.message);
    //     }
    //   });
    // })
    // .on('error', function(err) {
    //   console.log(err)
    // });
}
