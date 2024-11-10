// console.log("I Love Node.js")

// By Using Node.js
const readline = require("readline");

let rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("Please Enter Your Name :- ",(name)=>{
    console.log(name);
    rl.close()
});

rl.on("close",()=>{
    console.log("Readline Interface Is Closed");
    process.exit(0);
});