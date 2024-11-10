const express = require("express");
const mc = require("../Controllers/moviecontroller")
let mr = express.Router();

mr.param('id',mc.checkId);

mr.route("/").get(mc.getAllMovie).post(mc.validatebody,mc.createMovie);

mr.route("/:id")
  .get(mc.checkId,mc.getMovieById)
  .patch(mc.checkId,mc.validatebody,mc.updateMovieById)
  .delete(mc.checkId,mc.deleteMovieById);

module.exports = mr;
