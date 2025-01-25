require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.json())

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', require('./routes/auth'))

// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
  if (error) {
    console.error('Server error:', error)
  } else {
    console.log(`Server listening on http://localhost:${PORT}`)
  }
})

console.log('JWT_SECRET:', process.env.JWT_SECRET)
