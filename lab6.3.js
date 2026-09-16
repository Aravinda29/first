const http = require("http");
const url = require("url");
const queryString = require("querystring");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write("<h2>URL and QueryString</h2>");
        res.write("<p>Name: " + (parsedUrl.query.name || "") + "</p>");
        res.write("<p>Age: " + (parsedUrl.query.age || "") + "</p>");

        res.end();
    }

    else if (req.method === "POST") {
        let body = "";

        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            const form = queryString.parse(body);

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.write("<h2>Form Parameters</h2>");
            res.write("<p>Name: " + form.name + "</p>");
            res.write("<p>Email: " + form.email + "</p>");

            res.end();
        });
    }

    else {
        res.writeHead(405, {
            "Content-Type": "text/plain"
        });

        res.end("Method Not Allowed");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
