const Movie = require("./../model/movieData");

// const validatebody = (req, res, next) => {
//   if (!req.body.name && !req.body.releaseYear) {
//     return res.status(400).json({
//       "status": "fail",
//       "msg": "Not Valid Data",
//     });
//   }
//   next();
// };
const getAllMovie = async (req, res) => {
  try {
    // const allMovie = await Movie.find({});
    // console.log(req.query);

    // const allMovieByFilter = await Movie.find(req.query); not good way
    // Mongoose 6.0 ot less
    // const excludefield = ['sort','page','limit','fields'];
    // const queryObj = {...req.query};

    // excludefield.forEach((e)=>{
    //   delete queryObj[e];
    // });

    // console.log(queryObj);
    // const allMovieByFilter = await Movie.find(queryObj);

    const quystr = JSON.stringify(req.query);
    const modifiedQuystr = quystr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const q = JSON.parse(modifiedQuystr);
    const allMovieByFilter = await Movie.find(q);

    res.status(200).json({
      message: "Success",
      count: allMovieByFilter.length,
      data: {
        allMovieByFilter,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 404,
      message: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      message: "Success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 404,
      message: error.message,
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        movie: movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
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
    res.status(201).json({
      status: "Success",
      data: {
        movie: movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const data = await Movie.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "Success",
      data: {
        movie: data,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  getAllMovie,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
};
