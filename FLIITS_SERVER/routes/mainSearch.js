import express from "express";
const router = express.Router();
import Car from "../models/Car.js";

router.post("/mainSearch", async (req, res) => {
  const { destination, startDate, startTime, endDate, endTime } = req.body;

  try {
    // Validate required fields
    const missingFields = [];
    if (!destination) missingFields.push("destination");
    if (!startDate) missingFields.push("startDate");
    if (!endDate) missingFields.push("endDate");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missing: missingFields,
      });
    }

    // Date validation
    const searchStart = new Date(`${startDate}T${startTime || "00:00"}`);
    const searchEnd = new Date(`${endDate}T${endTime || "23:59"}`);

    if (isNaN(searchStart)) return res.status(400).json({ error: "Invalid start date" });
    if (isNaN(searchEnd)) return res.status(400).json({ error: "Invalid end date" });
    if (searchEnd <= searchStart) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    // Check if the destination contains a city or country
    const locationQuery = {
      $or: [
        { city: { $regex: destination, $options: "i" } },  // Case-insensitive match for city
        { country: { $regex: destination, $options: "i" } }  // Case-insensitive match for country
      ]
    };

    // Find cars based on the destination (city or country)
    const cars = await Car.find(locationQuery);

    // Filter available cars based on availability
    const availableCars = cars.filter((car) => {
      try {
        const availableDays = Number(car.availabilityDays[0]);  
const availableHours = Number(car.availabilityHours[0]);  
// console.log("availableDays2",availableDays)

        return isCarAvailable(availableDays, availableHours, searchStart, searchEnd);
      } catch (error) {
        console.error("Error processing car:", car._id, error);
        return false;  // If any error occurs, car is considered unavailable
      }
    });

    // Return the filtered available cars
    console.log("availableCars",availableCars)
    res.json(availableCars);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to check if a car is available during the given time period
function isCarAvailable(availableDays, availableHours, searchStart, searchEnd) {
  // Calculate total rental days
  const totalDays = calculateTotalDays(searchStart, searchEnd);
  console.log("Total days :", totalDays, " availableDays:", availableDays);

  // Check if the car is available for the required number of days
  console.log(totalDays > availableDays)
  if (totalDays > availableDays){ 
    return false;
}
console.log("after")
  if (totalDays <= 1) {
    // Calculate hours needed per day for hourly rentals
    const hoursPerDay = getMaxHoursPerDay(searchStart, searchEnd);

    const maxNeededHours = Math.min(...hoursPerDay);  // Min of all hours in the range
    if (maxNeededHours > availableHours) return false;  // Car is unavailable if hours exceed allowed hours
  }

  return true;  // Car is available if all checks pass
}

// Function to calculate total days between start and end dates
function calculateTotalDays(start, end) {
  const diffMs = end - start;  // Difference in milliseconds
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));  // Convert to days
}

// Function to calculate the maximum hours needed per day for hourly rentals
function getMaxHoursPerDay(start, end) {
  const hoursPerDay = [];
  const current = new Date(start);

  // Loop through all days in the range
  while (current <= end) {
    const dayStart = new Date(current);
    dayStart.setUTCHours(7, 0, 0, 0);  // Set to start of the day
    const dayEnd = new Date(current);
    dayEnd.setUTCHours(23, 59, 59, 999);  // Set to end of the day

    const overlapStart = new Date(Math.max(start, dayStart));  // Calculate overlap
    const overlapEnd = new Date(Math.min(end, dayEnd));  // Calculate overlap

    const hours = (overlapEnd - overlapStart) / 3600000;  // Hours in overlap period
    hoursPerDay.push(hours);

    current.setDate(current.getDate() + 1);  // Move to next day
    current.setUTCHours(0, 0, 0, 0);  // Reset to midnight
  }

  return hoursPerDay;  // Return array of hours per day
}

export default router;
