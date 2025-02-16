const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    rating: Number,
    description: String
});

module.exports = mongoose.model('Movie', movieSchema);