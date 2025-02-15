import express from 'express';
import morgan from 'morgan';

import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import book from './models/book.js';


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// log in using morgan
app.use(morgan('dev'));

// Connect to database
connectDB();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const inventory = await book.find();
        res.render('index', { inventory });
    }
    catch (error) {
        res.status(500).send(`Server error: ${error}`);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});