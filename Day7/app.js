// Import Express Module
let express = require("express");

// Create instace of express.js(server)
const app = express();

// Route : HTTP Method + url
app.get("/",(req,res)=>{
    // res.send(`<h1>Hello Express.js</h1>`);
    // res.end(`<h1>Hello Express.js</h1>`);
    res.json({meg:"Hello Express.js"});
});

// Create Server
app.listen(3000,()=>{
    console.log("Server Started");
});