import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';

import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import Book from './models/Book.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// use morgan for logging
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try{
        const inventory = await Book.find(); // Fetch all books
        res.render('index', { inventory });
    }
    catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


