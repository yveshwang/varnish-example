// Yves Hwang
// 20.08.2015
// simple if-modified-since and if-none-match http server

"use strict";

var http = require('http');
var dispatcher = require('httpdispatcher');
var uuid = require('uuid');

var PORT=8080;
var HASH = uuid.v1();
var HTTP_DATE = new Date().toUTCString();

function handleRequest(request, response){
  try {
    console.log(request.url);
    dispatcher.dispatch(request, response);
  } catch(err) {
    console.log(err);
  }
}

dispatcher.onGet("/inm", function(req, res) {
  // throw in a if-none-match support, match on anything for now
  if( req.headers['if-none-match'] != null) {
    res.writeHead(304);
    res.end();
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain', 'ETag' : '"'+ HASH +'"' });
    res.end('foo bar');
  }
});

dispatcher.onGet("/ims", function(req, res) {
  // throw in a if-modified-since support, match on anything for now
  if( req.headers['if-modified-since'] != null) {
    res.writeHead(304);
    res.end();
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Last-Modified' : HTTP_DATE});
    res.end('rofl');
  }
});

dispatcher.onGet("/", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('boom!');
});

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log(HASH);
  console.log(HTTP_DATE);
  console.log("listening: http://localhost:%s", PORT);
});
