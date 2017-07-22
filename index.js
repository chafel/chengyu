﻿var express = require("express");
var app = express();
var path =require('path');
var bodyparser = require('body-parser');
app.use( bodyparser.json() );
app.use(bodyparser.urlencoded({extended: false}));

var request = require('./requestData');

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
  var word = text.split(' ').slice(1).join('');
  console.log(word);
  request(apikey, word, function(data) {
    const {
      total, result, error_code, reason
    } = JSON.parse(data);
    console.log(total, error_code, reason);
    if (error_code !== 0) {
      fakeMessage.text = reason;
    } else {
      fakeMessage.text = result.reduce(function(string, v, i) {
        return string += v.name;
      }, '');
    }
    res.end(JSON.stringify(fakeMessage));
  });
})
app.listen(port);
