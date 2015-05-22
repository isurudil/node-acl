var http = require("http");
var url = require("url");
var queryString = require("querystring");

console.log("started");

function start(route, handle) {
    function onRequest(request, response) {
        console.log("Request Received");
        var pathname = url.parse(request.url).pathname;
        console.log("Request path name : " + pathname)

        route(handle ,pathname);

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("server started");
}
exports.start = start;
