// 构建 主服务

var http = require('http')
var url = require('url')

function startServer(router, handler) {
  http.createServer(function(req, res) {
    try {
      var _url = url.parse(req.url).pathname
      router(_url, handler, res, req)
    } catch (e) {
    }
  }).listen(8888)
}


console.log('服务器运行：http://localhost:8888')

module.exports = startServer