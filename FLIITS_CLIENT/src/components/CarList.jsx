import React, { useEffect, useState } from "react";
import CarCard from "./CarCard"; 
import axios from "axios";

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/add-car") 
      .then((response) => {
        setCars(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div className="car-list">
      {cars.length > 0 ? (
        cars.map((car, index) => <CarCard key={index} items={car} />)
      ) : (
        <p>Loading cars...</p>
      )}
    </div>
  );
}

export default CarList;
