const Movie = require("./../model/movieData");
const ApiFeature = require("./../Utils/ApiFeacture");

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

const getHighRated = (req, res, next) => {
  // console.log("hi")
  req.query.sort = '-price';
  req.query.limit = '3';
  next();
};

const getAllMovie = async (req, res) => {
  try { 
    const feature = new ApiFeature(Movie.find(), req.query).filter().sort()
      .limitField()
      .pagination();
      
    const movies = await feature.query;
    res.status(200).json({
      message: "Success",
      count: movies.length,
      data: { movies },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: { movie },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: { movie },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { movie },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getmovieStat = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { 'rating': { $gte: 8.9} } },
      {$group:{
        '_id':null,
        "avgRating":{$avg:'$rating'},
        'avgprice':{$avg:"$price"},
        "minprice":{
          $min:"$price"
        },
        "maxprice":{
          $max:'$price'
        }
      }
      },{
        $project:{
          _id : 0
        }}
    ]);
    res.status(200).json({
      status: "success",
      count : stats.length,
      data: { stats },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {
  getHighRated,
  getAllMovie,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
  getmovieStat
  // validateBody,
};
