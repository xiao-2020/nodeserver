
middleWare = function (req, res, context) {
  res.end(new Buffer([1,2,3]))
}

exports.middleWare = middleWare