const express = require("express");
const mc = require("../Controllers/moviecontroller");
const auth = require("./../Controllers/authController");

let mr = express.Router();

mr.route("/").get(auth.protect,mc.getAllMovie).post(auth.protect,mc.createMovie);
mr.route("/moviestat").get(auth.protect,mc.getmovieStat);

mr.route("/high-rated").get(mc.getHighRated, mc.getAllMovie);
mr.route("/:id")
  .get(auth.protect,mc.getMovieById)
  .patch(mc.updateMovieById)
  .delete(auth.protect,auth.restrict('admin'),mc.deleteMovieById);

module.exports = mr;