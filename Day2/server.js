const http = require("http");

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req,res)=>{
    // console.log(req);
    // console.log(res);
    
    res.end("Welcome To Node.js World");
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});