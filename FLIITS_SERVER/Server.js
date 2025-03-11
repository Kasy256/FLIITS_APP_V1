// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import addCarRoute from './routes/add-car.js'; 
import searchCar from './routes/Search-car.js'; 
import mainSearchCar from './routes/mainSearch.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Serve static files from the 'uploads' folder for image access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware setup
app.use(cors({
  origin: process.env.VITE_CLIENT_BASE_URL, // Your frontend URL
  credentials: true,
}));
app.use(express.json()); // Allows JSON parsing for incoming requests

// Use the routes
app.use('/api', addCarRoute);  // For adding and managing cars
app.use('/api', searchCar);    // For searching cars
app.use('/api/mainSearch', mainSearchCar);  // For main search

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);  // Exit process with failure
  });

// Sample Route
app.get('/', (req, res) => {
  res.send('🚀 Fliits API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
