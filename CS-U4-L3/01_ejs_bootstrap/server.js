import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'inventory.json');
    const inventory = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.render('index', { inventory });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});