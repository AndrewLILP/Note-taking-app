import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// get the current file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

// define the first route
app.get('/', (req, res) => {
    const data = { title: 'EJS example', message: 'Hello there!' };
    res.render('index', data);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}