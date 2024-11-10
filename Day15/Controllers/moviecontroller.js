const Movie = require("./../model/movieData");
const ApiFeature = require("./../Utils/ApiFeacture");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomeError");

// Middleware to validate request body
// const validateBody = (req, res, next) => {
//   if (!req.body.name || !req.body.releaseYear) {
//     return res.status(400).json({
//       status: "fail",
//       msg: "Missing required fields: name and releaseYear",
//     });
//   }
//   next();
// };

// Middleware to get high-rated movies sorted by price
const getHighRated = (req, res, next) => {
  req.query.sort = "-price";
  req.query.limit = "3";
  next();
};

// Controller to get all movies with filtering, sorting, pagination
const getAllMovie = asyncErrorHandler(async (req, res, next) => {
  
  const feature = new ApiFeature(Movie.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .pagination();

  const movies = await feature.query;
  res.status(200).json({
    message: "Success",
    count: movies.length,
    data: { movies },
  });
});

// Controller to get movie by ID
const getMovieById = asyncErrorHandler(async (req, res, next) => {
  // Validate the ID format
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    const err = new CustomError("Movie with that ID is not found!", 404);
    return next(err);
  }

  res.status(200).json({
    message: "Success",
    data: { movie },
  });
});
// Controller to create a new movie
const createMovie = asyncErrorHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    data: { movie },
  });
});

// Controller to update a movie by ID
const updateMovieById = asyncErrorHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    const err = new CustomError("Movie with that ID is not found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: { movie },
  });
});

// Controller to delete a movie by ID
const deleteMovieById = asyncErrorHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    const err = new CustomError("Movie with that ID is not found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "Movie deleted successfully",
  });
});

// Controller to get movie statistics
const getmovieStat = asyncErrorHandler(async (req, res, next) => {
  const stats = await Movie.aggregate([
    { $match: { rating: { $gte: 8.9 } } },
    {
      $group: {
        _id: "$genre", // Example grouping by genre
        avgRating: { $avg: "$rating" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    count: stats.length,
    data: { stats },
  });
});

module.exports = {
  getHighRated,
  getAllMovie,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
  getmovieStat
};
