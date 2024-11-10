const express = require("express");
const mr = require("./Routes/movieRoute");

const app = express();

app.use(express.json());
app.use(express.static("./public"));
// Route Handler Function

// Get Request :- /api/v1/movie
// app.get("/api/v1/movie", getAllMovie);

// Get request for access specific record
// app.get("/api/v1/movie/:id",getMovieById);

// Post Request :-
// app.post("/api/v1/movie", createMovie);

// Update Movie Data
// app.patch("/api/v1/movie/:id", updateMovieById);

// Delete Movie
// app.delete("/api/v1/movie/:id", deleteMovieById);

// const mr = express.Router();

app.use("/api/v1/movie", mr);

module.exports = app;
