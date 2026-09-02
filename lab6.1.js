const http=require("http");

const server=http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/html"});
    res.write("<h1>hello Node.js</h1>");
    res.end();
});

server.listen(3000,()=>{
    console.log("Server running at port 300");
});