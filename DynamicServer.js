var http = require("http");

var message = ["hello", "welcome", "to", "Node.js"];

http.createServer(function (req, res) {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.write("<html>");
    res.write("<head><title>HTTP DEMO</title></head>");
    res.write("<body>");

    // hello in blue
    res.write("<h1 style='color: blue;'>" + message[0] + "</h1>");

    // welcome in red
    res.write("<h1 style='color: red;'>" + message[1] + "</h1>");

    // to in h1
    res.write("<h1>" + message[2] + "</h1>");

    // Node.js in small text
    res.write("<small>" + message[3] + "</small>");

    res.write("</body>");
    res.write("</html>");

    res.end();

}).listen(8080);

console.log("Server running at http://localhost:8080");
