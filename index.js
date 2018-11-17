

var startServer = require('./server')
var router = require('./route')
var handler = require('./handler')

startServer(router.route, handler)