require('dotenv').config();

const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

async function seedDatabase() {

    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    try {
        await Movie.deleteMany({});
        await Review.deleteMany({});

        const movies = [
            { title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: "Description for Movie Title 1" },
            { title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: "Description for Movie Title 2" },
            { title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: "Description for Movie Title 3" }
        ];

        const insertedMovies = await Movie.insertMany(movies);

        const reviews = [
            { movieId: insertedMovies[0]._id, reviewer: "John Doe", comment: "Great movie!", rating: 4 },
            { movieId: insertedMovies[0]._id, reviewer: "Jane Smith", comment: "Enjoyed it a lot.", rating: 5 },
            { movieId: insertedMovies[1]._id, reviewer: "Alice Brown", comment: "Fantastic!", rating: 5 }
        ];

        await Review.insertMany(reviews);

        console.log('Database seeded');
    }
    catch (err) {
        console.error('Error seeding database:', err);
    }
    finally {
        mongoose.connection.close();
    }
}

seedDatabase();