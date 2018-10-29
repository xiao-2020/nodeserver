const http = require('http')
const middleWare = require('./middleWare')
exports = module.exports

let app = http.createServer(function(req, res) {
  middleWare.middleWare(req, res, app)
})

app.listen(3566)

console.log('Server running at http://127.0.0.1:3566')


exports.app = app