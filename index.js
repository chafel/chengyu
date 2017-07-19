var http = require('http');
var url = require('url');

var port = Number(process.argv[2]);
var apikey = process.argv[3];
// target data url: 精神
var dataQueryUrl = `http://api.avatardata.cn/ChengYu/Search?key=${apikey}&keyWord=`;

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

var server = http.createServer(function (req, res) {
  console.log(req)
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  // if (/^\/api\/parsetime/.test(req.url)) {
  //   result = parsetime(time)
  // } else if (/^\/api\/unixtime/.test(req.url)) {
  //   result = unixtime(time)
  // }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(port)