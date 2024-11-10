const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

const app = require("./app");

// Retrieve PORT and DB_URL from environment variables
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbUrl)
    .then((conn) => {
        // console.log(conn);
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


// const testMovie = new Movie({
//     name:"Never Give U",
//     description:"Motive",
//     duration:60,
//     rating:4.5
// });
// testMovie.save().then((doc)=>{
//     console.log(doc);
// });
// Start the server
app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});
