var exec = require('child_process').exec
var querystring = require("querystring");
var fs = require('fs')
var formidable = require("formidable");
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodejs'
});
var handler = {
  '/'(res) {
    console.log('/')
    var content = 'empty'
    exec('find /', {timeout: 10000,maxBuffer: 20000*1024},function(err, stdout, stderr) {
      content = stdout
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(stdout);
      res.end();
    })
    // function timer(val) {
    //   var startTime = new Date().getTime()
    //   while(new Date().getTime() < startTime + val);
    // }
    // timer(5000)
  },
  '/main': function(res) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/text" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
  },
  '/text'(res, req) {
    var postData = ''
    req.setEncoding('utf8')
    req.addListener('data', function(postChunkData) {
      postData += postChunkData 
    })
    req.addListener('end', function() {
      // ! 链接数据库 mysql
      connection.connect()
      var addSql = 'INSERT INTO user(userName, nickName, submission_date, password) VALUES(?, ?, ?, ?)'
      var  addSqlParams = ['张嘉琛', 'JackChen', new Date().toLocaleDateString().replace(/\//g, '-'),Math.ceil(Math.random()* 10000000)];
      connection.query(addSql, addSqlParams, function (error, result, fields) {
        if (error) throw error;
        console.log('The solution is: ', result, fields);
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(JSON.stringify(result));
        res.end();
      });
    })
  },
  '/file'(res, req) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
  },
  '/upload'(res,req) {
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, filds, files) {
      fs.renameSync(files.upload.path, "./temp/test.png");
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write("received image:<br/>");
      res.write("<img src='/show' />");
      res.end();
    })
  },
  '/show'(res, req) {
    fs.readFile('./temp/test.png', 'binary', function(err, file) {
      if(err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(file, "binary");
        res.end();
      }
    })
  }
}

module.exports = handler