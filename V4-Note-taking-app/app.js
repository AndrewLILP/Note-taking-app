
require ('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Movie = require('./models/Movie');
const Review = require('./models/Review');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const movies = [
    { id: 1, title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
    { id: 2, title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
    { id: 3, title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
];

const reviews = {
    1: [
        { reviewer: "John Doe", comment: "Great movie!", rating: 4 },
        { reviewer: "Jane Smith", comment: "Enjoyed it a lot.", rating: 5 }
    ],
    2: [
        { reviewer: "Alice Brown", comment: "Fantastic!", rating: 5 }
    ],
    3: []
};

app.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
});

app.get('/movie/:id', async (req, res) => {

    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    const movieReviews = await Review.find({ movieId });

    if (movie) {
        res.render('movie-detail', { movie: movie, reviews: movieReviews });
    } 
    else {
        res.status(404).send('Movie not found');
    }
});

app.get('/submit-review', async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch all movies
        res.render('submit-review', { movies }); // Pass movies to the template
    } 
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error loading review form');
    }
});

app.post('/submit-review', async (req, res) => {
    const { movieId, reviewer, rating, comment } = req.body;

    try {
        // Validate movieId as a proper ObjectId
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            throw new Error('Invalid movie ID');
        }

        const newReview = new Review({
            movieId,
            reviewer,
            rating: parseInt(rating, 10),
            comment
        });

        await newReview.save();
        res.redirect(`/movie/${movieId}`);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(400).send('Invalid movie ID or review data.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});