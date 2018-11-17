function route(url, handler,res,req) {
  if(typeof handler[url] === 'function') {
    return handler[url](res,req)
  } else {
    console.log("No request handler found for " + url);
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not found");
    res.end();
  }
}

module.exports.route = route
