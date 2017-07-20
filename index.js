﻿var express = require("express");
var app = express();
var path =require('path');
var bodyparser = require('body-parser');
app.use( bodyparser.json() );
app.use(bodyparser.urlencoded({extended: false}));

var request = require('./requestData');

var port = Number(process.argv[2]);
var apikey = process.argv[3];
// target data url:
// var dataQueryUrl = `http://api.avatardata.cn/ChengYu/Search?key=${apikey}&keyWord=`;


var fakeMessage = {
  "text" : "##~~text, this field may accept markdown~~",
  "attachments" : [
    {
      "title" : "Ask:",
      "text" : "Who am I?",
      "color" : "#666666",
      "images" : [
        {
          "url" : "https://lh4.googleusercontent.com/-hdQ2HH5-hog/AAAAAAAAAAI/AAAAAAAAAAA/GW2OyU89jXE/W96-H96/photo.jpg"
        }
      ]
    }
  ]
};

// TODO: save log
app.post('/chengyu', function(req, res) {
  const { token, text, trigger_word, user_name } = req.body;
  if (token !== '8d37093bb3548d9be7d876147d288337') {
    res.status(404)        // HTTP status 404: NotFound
      .end('Not found');
  }
  var word = text.split(' ').slice(1).join('');
  console.log(word);
  request(apikey, word, function(data) {
    console.log(data);
    res.end(JSON.stringify(data));
  });
})
app.listen(port);

// req data format:
// {
//   "token" : "8d37093bb3548d9be7d876147d288337",
//   "ts" : 1355517523,
//   "text" : "!baike 中国",
//   "trigger_word" : "!baike",
//   "subdomain" : "your_domain",
//   "channel_name" : "your_channel",
//   "user_name" : "your_name"
// }

//外部服务可以通过验证请求数据中的 token 是否为 8d37093bb3548d9be7d876147d288337 来判断请求有效性。

/*外部服务可以返回一个 Response，如果格式满足下面的样例，Outgoing 会发送一条对应的消息到讨论组内

Response:

{
  "text" : "text, this field may accept markdown",
  "attachments" : [
  {
    "title" : "title_1",
    "text" : "attachment_text",
    "color" : "#666666",
    "images" : [
      {
        "url" : "http://example.com/index.jpg"
      },
      {
        "url" : "http://example.com/index.jpg"
      }
    ]
  }
]
}*/