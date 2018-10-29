
middleWare = function (req, res, context) {
  res.end(JSON.stringify({name: 'liuxiao'}))
}

exports.middleWare = middleWare