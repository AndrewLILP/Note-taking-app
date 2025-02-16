import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan';

// Initialize express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use morgan for logging requests in 'dev' format
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

app.use('/api',userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});