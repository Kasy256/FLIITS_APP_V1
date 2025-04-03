import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/Hero.css";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/mainSearch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        
          body: JSON.stringify({
            destination: location,
            startDate,
            startTime,
            endDate,
            endTime,
          }),
        }
        
      );
      console.log("099", response);
      if (!response.ok) {
        throw new Error("Search failed");
      }

      const availableVehicles = await response.json();
      console.log("availableVehicles", availableVehicles);
      navigate("/AfterSearch", {
        state: {
          cars: availableVehicles,
          searchParams: { location, startDate, endDate, startTime, endTime },
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      // Add error state or notification here
    }
  };

  return (
    <section className="hero">
      <form className="booking" onSubmit={handleSubmit}>
        <div className="location">
          <div className="booking-titles">
            <label htmlFor="destination">Location</label>
          </div>
          <div className="booking-inputs">
            <input
              type="search"
              name="destination"
              id="destination"
              placeholder="City, Hotel or Airport"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="separator"></div>

        <div className="dates">
          <div className="booking-titles">
            <label htmlFor="start">From</label>
          </div>
          <div className="booking-inputs">
            <input
              type="text"
              name="start"
              placeholder="Add Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              required
            />
            <input
              type="text"
              name="startTime"
              placeholder="Add Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              onFocus={(e) => (e.target.type = "time")}
              required
            />
          </div>
        </div>
        <div className="separator"></div>

        <div className="time">
          <div className="booking-titles">
            <label htmlFor="start">To</label>
          </div>
          <div className="booking-inputs">
            <input
              type="text"
              name="stop"
              placeholder="Add Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              required
            />
            <input
              type="text"
              name="stopTime"
              placeholder="Add Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              onFocus={(e) => (e.target.type = "time")}
              required
            />
          </div>
        </div>
        <button type="submit" id="search">
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default Hero;
