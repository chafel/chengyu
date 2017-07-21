var request = require('request');

module.exports = (key, word, cb) {
  const dataUrl = `http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`;

  request.get(`http://api.avatardata.cn/ChengYu/Search?key=${key}&keyWord=${word}`)
    .on('response', function (response) {
      console.log(response.statusCode);
      console.log(response);
    })
    .on('error', function(err) {
      console.log(err)
    });
}
