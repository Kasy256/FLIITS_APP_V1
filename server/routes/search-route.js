// import express from 'express';
// import Car from '../models/Car.js'; // Ensure your car model is correctly imported

// const router = express.Router();

// // Route to fetch available cars based on location
// router.post('/search', async (req, res) => {
//   try {
//     const { location } = req.body;

//     // Query cars that match the location
//     const availableCars = await Car.find({ location });

//     res.json(availableCars);
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// export default router;
