// test-db.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');

// Simple test model
const TestSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
});
const Test = mongoose.model('Test', TestSchema);

// Self-executing async function to test database
(async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connection successful! Let\'s try to save some data...');
    
    // Create a test document
    const testDoc = new Test({ name: 'Test Document' });
    await testDoc.save();
    console.log('Successfully saved a test document!');
    
    // Retrieve documents to verify saving worked
    const documents = await Test.find({});
    console.log('Retrieved documents:', documents);
    
    // Clean up - delete the test document
    await Test.deleteMany({});
    console.log('Cleaned up test documents');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    console.log('ALL TESTS PASSED! Your MongoDB connection is working correctly.');
  } catch (error) {
    console.error('Database test failed with error:', error);
  }
})();