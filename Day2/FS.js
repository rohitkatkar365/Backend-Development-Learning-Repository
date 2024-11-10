const fs = require("fs");

// Synchronously manipulation 

let read = fs.readFileSync("output.txt","utf-8");
console.log(read);

// let content = "I Love MERN Stack"
let wr = fs.writeFileSync("input.txt",read);

