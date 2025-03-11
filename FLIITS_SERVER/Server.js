// Load environment variables
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import addCarRoute from './routes/add-car.js'; 
import searchCar from './routes/Search-car.js'; 
import mainSearchCar from './routes/mainSearch.js'; 
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(cors({
  origin:process.env.VITE_CLIENT_BASE_URL, // Your frontend URL
  credentials: true
}));
app.use(express.json()); 

// Use the add-car route
app.use('/api', addCarRoute);

// Use the search route
app.use('/api', searchCar);
app.use('/api/mainSearch', mainSearchCar);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); 
  });

// Sample Route
app.get('/', (req, res) => {
  res.send('🚀 Fliits API is running...');
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
