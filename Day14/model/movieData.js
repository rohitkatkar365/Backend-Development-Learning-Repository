const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: true,
  },
  director: {
    type: [String],
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  actor: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
});

movieSchema.pre('save',(next)=>{
  console.log(this);
  next();
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
