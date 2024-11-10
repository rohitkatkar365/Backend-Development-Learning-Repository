const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
const url = `127.0.0.1`;

app.use(express.json());
let movie = JSON.parse(fs.readFileSync("./data/movies.json"));

// Get Request :- /api/v1/movie
app.get("/api/v1/movie", (req, res) => {
  res.status(200).json({
    status: "success",
    count: movie.length,
    data: {
      movie,
    },
  });
});

// Post Request :-
app.post("/api/v1/movie", (req, res) => {
  // console.log(req.body);
  const newId = movie[movie.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movie.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movie), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
  console.log(req.body);
  res.end("Created");
});

app.listen(port, url, () => {
  console.log(`Server Started ${url}:${port}`);
});
