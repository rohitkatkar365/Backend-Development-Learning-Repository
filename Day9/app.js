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

// Get request for access specific record
app.get("/api/v1/movie/:id", (req, res) => {
  // Log the request params and id conversion
  console.log("Request params:", req.params);

  let id = +req.params.id;
  console.log("Converted ID:", id);

  // Find record by id
  let res1 = movie.find((e) => e.id === id);

  // Log the result of the find operation
  console.log("Found Movie:", res1);

  // If record not found, send 404 response
  if (!res1) {
    return res.status(404).json({
      status: "Not Found",
      message: `Movie with ID ${id} is not found`,
    });
  }

  // Send success response if record is found
  res.status(200).json({
    status: "success",
    data: {
      data: res1,
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
  // console.log(req.body);
  res.end("Created");
});

app.patch("/api/v1/movie/:id", (req, res) => {
  let id = +req.params.id;

  // Find the movie by id
  let res2 = movie.find((el) => el.id === id);

  // If the movie is not found, send a 404 response
  if (!res2) {
    return res.status(404).json({
      status: "Not Found",
      message: `Movie with ID ${id} is not found`,
    });
  }

  // Find the index of the movie in the array
  let ind = movie.indexOf(res2);

  // Update the movie with data from req.body
  Object.assign(res2, req.body);

  // Save the updated movie back to the array
  movie[ind] = res2;

  // Write the updated movies array to the file
  fs.writeFile("./data/movies.json", JSON.stringify(movie, null, 2), (err) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        message: "Could not save the updated data",
      });
    }

    // Send the success response
    res.status(200).json({
      status: "Success",
      data: {
        data: res2,
      },
    });
  });
});

app.listen(port, url, () => {
  console.log(`Server Started ${url}:${port}`);
});
