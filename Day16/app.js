const express = require("express");
const dotenv = require("dotenv");
const mr = require("./Routes/movieRoute");
const authRoute = require("./Routes/authRoute");
const CustomError = require("./Utils/CustomeError");
const GlobalErrorHandler = require("./Controllers/ErrorController");

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(express.static("./public"));

// Route Handlers
app.use("/api/v1/movie", mr);
app.use("/api/v1/user", authRoute); 

// Catch-all for undefined routes
app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

app.use(GlobalErrorHandler);

module.exports = app;
