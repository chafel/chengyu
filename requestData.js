var request = require('request');

module.exports = function (key, word, cb) {
  const dataUrl = `http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`;

  request.get(`http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`)
    .on('response', function (response) {
      console.log(response.statusCode);
      console.log(response.headers['content-type'])
      console.log(response.headers['host']);
      console.log(response.headers['from']);

      let error;
      if (response.statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => { rawData += chunk; });
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          cb(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', function(err) {
      console.log(err)
    });
}
