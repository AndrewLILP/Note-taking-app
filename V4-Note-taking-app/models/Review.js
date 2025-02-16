const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieId: mongoose.Schema.Types.ObjectId,
    reviewer: String,
    rating: Number,
    comment: String
});

module.exports = mongoose.model('Review', reviewSchema);