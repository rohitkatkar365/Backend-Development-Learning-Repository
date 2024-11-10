const http = require("http");
const event = require("events");

const e = new event.EventEmitter();

e.on("request",()=>{
    console.log("Hi, I Am RRK");
});

let server = http.createServer((req,res)=>{
    e.emit("request",req,res);
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});