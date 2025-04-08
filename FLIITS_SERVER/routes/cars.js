import express from "express";
const router = express.Router();
import Car from "../models/Car.js";

router.get("/:carId",async(req,res)=>{
    console.log("params",req.params)                                                                                                                                                    
    try {
        const car = await Car.findById(req.params.carId);
        if (!car) {
          return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
      } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).json({ message: 'Server error' });
      }
})

export default router;