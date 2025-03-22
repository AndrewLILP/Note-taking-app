const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * The function handles connection events and returns a promise
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
  try {
    // Set Mongoose options to handle deprecation warnings
    const options = {
      // These options ensure Mongoose uses the latest MongoDB driver features
      // and prevents deprecation warnings
    };

    // Connect to MongoDB using the connection string from environment variables
    // This allows for different connection strings in development and production
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure if we can't connect to the database
    process.exit(1);
  }
};

module.exports = connectDB;