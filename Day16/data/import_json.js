const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const movie = require("./../model/movieData");

dotenv.config();
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

const deleteMovie = async () => {
    try {
        await movie.deleteMany({});
        console.log("Deleted Successfully");
    } catch (error) {
        console.error("Error deleting movies:", error);
    } finally {
        mongoose.connection.close();
    }
};

const importMovie = async () => {
    try {
        await movie.create(movies);
        console.log("Data Successfully Added");
    } catch (error) {
        console.error("Error importing movies:", error);
    } finally {
        mongoose.connection.close();
    }
};

if (process.argv[2] === '--delete') {
    deleteMovie();
} else {
    importMovie();
}
