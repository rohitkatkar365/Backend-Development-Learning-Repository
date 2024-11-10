const fs = require("fs");

// Using Readable Streams
let readablestream = fs.createReadStream("largefile.txt",{encoding:"utf-8"});

readablestream.on('data',(chunk)=>{
    console.log(`${chunk}`);
});

readablestream.on('end',()=>{
    console.log("No More Data To Read");
});

readablestream.on('error',(err)=>{
    console.log(err);
});