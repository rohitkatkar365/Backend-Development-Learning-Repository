const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

const app = require("./app");

// Retrieve PORT and DB_URL from environment variables, with default values
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/mydatabase";

// Connect to MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", process.env.NODE_ENV === 'development' ? err : "Connection failed.");
    });

// Start the server and store the reference to use for graceful shutdown
const server = app.listen(port, () => {
    console.log(`Server started at http://127.0.0.1:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection occurred:', err.message);
    server.close(() => {
        console.log('Shutting down due to unhandled rejection');
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception occurred:', err.message);
    // Exit process immediately, as the app state might be unstable
    process.exit(1);
});
