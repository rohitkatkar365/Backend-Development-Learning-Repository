const express = require("express");
const mc = require("../Controllers/moviecontroller")
let mr = express.Router();

mr.route("/").get(mc.getAllMovie).post(mc.createMovie);

mr.route("/:id")
  .get(mc.getMovieById)
  .patch(mc.updateMovieById)
  .delete(mc.deleteMovieById);

module.exports = mr;
