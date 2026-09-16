const https = require("https");
const fs = require("fs");
const { URL } = require("url");
const querystring = require("querystring");
const options = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("./cert/server.crt")
};
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 1024 * 1024) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
const server = https.createServer(options, async (req, res) => {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const queryParams = Object.fromEntries(
      url.searchParams.entries()
    );
    console.log(`${req.method} ${url.pathname}`);
    console.log("Query:", queryParams);
    let bodyParams = {};
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      const body = await readBody(req);
      const contentType = req.headers["content-type"] || "";
      if (contentType.includes("application/x-www-form-urlencoded")) {
        bodyParams = querystring.parse(body);
      } else if (contentType.includes("application/json")) {
        try {
          bodyParams = JSON.parse(body);
        } catch {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });
          return res.end(JSON.stringify({
            error: "Invalid JSON"
          }));
        }
      }
    }
    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });
      return res.end(`
        <html>
          <head>
            <title>Node.js HTTPS Server</title>
          </head>
          <body>
            <h1>HTTPS Server is running!</h1>

            <p>This page was served over HTTPS.</p>

            <form method="POST" action="/submit">
              <label>Name:</label>
              <input type="text" name="name">

              <br><br>

              <label>Email:</label>
              <input type="email" name="email">

              <br><br>

              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
      `);
    }
    else if (req.method === "GET" && url.pathname === "/api") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      return res.end(JSON.stringify({
        success: true,
        method: req.method,
        query: queryParams
      }));
    }
    else if (req.method === "POST" && url.pathname === "/submit") {
      console.log("Form parameters:", bodyParams);
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      return res.end(JSON.stringify({
        success: true,
        message: "Form received",
        query: queryParams,
        form: bodyParams
      }));
    }
    else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });
      return res.end(JSON.stringify({
        error: "Not Found"
      }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify({
      error: "Internal Server Error"
    }));
  }
});
const PORT = 8443;
server.listen(PORT, () => {
  console.log(`HTTPS server running at:`);
  console.log(`https://localhost:${PORT}`);
});
