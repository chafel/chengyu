﻿var express = require("express");
var app = express();
var path =require('path');
var bodyparser = require('body-parser');
app.use( bodyparser.json() );
app.use(bodyparser.urlencoded({extended: false}));

var winston = require('winston');
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'my.log' })
  ]
});

var request = require('./requestData');
var isChineseWord = require('./utils/isChineseWord');

var port = Number(process.argv[2]);
var apikey = process.argv[3];

var fakeMessage = {
  "text" : "##~~text, this field may accept markdown~~",
  // "attachments" : [
  //   {
  //     "title" : "Ask:",
  //     "text" : "Who am I?",
  //     "color" : "#666666",
  //     "images" : [
  //       {
  //         "url" : "https://lh4.googleusercontent.com/-hdQ2HH5-hog/AAAAAAAAAAI/AAAAAAAAAAA/GW2OyU89jXE/W96-H96/photo.jpg"
  //       }
  //     ]
  //   }
  // ]
};

// TODO: save log
app.post('/chengyu', function(req, res) {
  const { token, text, trigger_word, user_name } = req.body;
  if (token !== '8d37093bb3548d9be7d876147d288337') {
    res.status(404)        // HTTP status 404: NotFound
      .end('Not found');
  }
  var words = text.split(' ');
  var word;
  if (words.length > 2) {
    fakeMessage.text = '请使用正确的格式：!chengyu+任意个数的汉字';
    res.end(JSON.stringify(fakeMessage));
    return;
  } else {
    word = words.slice(1).join('');
    winston.log(word);
    var findedChineseWord = word.split('').find(isChineseWord);
    if (!findedChineseWord) {
      fakeMessage.text = '请使用正确的格式：`!chengyu+任意个数的汉字`';
      res.end(JSON.stringify(fakeMessage));
      return;
    }
  }

  console.log(word);

  request(apikey, word, function(data) {
    const {
      total, result, error_code, reason
    } = JSON.parse(data);
    winston.log(total, error_code, reason);
    if (error_code !== 0) {
      fakeMessage.text = reason;
    } else {
      if (total === 0) {
        fakeMessage.text = '这=͟͟͞͞不=͟͟͞͞是=͟͟͞͞个=͟͟͞͞成=͟͟͞͞语=͟͟͞͞吧=͟͟͞͞，我=͟͟͞͞也=͟͟͞͞找=͟͟͞͞不=͟͟͞͞到=͟͟͞͞，sorry';
        res.end(JSON.stringify(fakeMessage));
        return;
      }
      fakeMessage.text = result.reduce(function(string, v, i) {
        return string += `${i+1}. ${v.name}\n`;
      }, '搜索结果：\n');
    }
    res.end(JSON.stringify(fakeMessage));
  });
})
app.listen(port);
