const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');

dotenv.config();
console.log(process.env.MONGODB_URI);


const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/notes', noteRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('DB works!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
