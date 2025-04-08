import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaMedal, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/CarCard.css";

function CarCard({ items,searchParams }) {
  const [iconColor, setIconColor] = useState("black");
  const navigate = useNavigate();

  let ratingIcon = [];
  for (let icon = 0; icon < (items.stars || 0); icon++) {
    ratingIcon.push(<FaStar key={icon} />);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    setIconColor(iconColor === "black" ? "gold" : "black");
  };
// console.log("fis",searchParams,items)
  const CarInfo = () => {           
    navigate("/CarInfoPage", {state: { 
      car: items,
      searchParams:searchParams // Pass along the search params
    } }); // Pass car details via state
  };

  return (
    <div className="Card-container" onClick={CarInfo}>
      <img
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
          items.carPhotos?.frontView
        }`}
        alt="Car"
        className="car-img"
      />
      <div className="car-info">
        <div className="car-name">
          <h4>
            {items.model} ({items.year})
          </h4>
          <div className="heart-icon">
            <FaHeart
              style={{
                color: iconColor,
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={handleClick}
            />
          </div>
        </div>

        <div className="car-rating">
          {ratingIcon.length > 0 && <p className="car-star">{ratingIcon}</p>}
          <p className="car-trip">
            <FaMedal /> {items.trips || 0} Trips
          </p>
        </div>

        <div className="car-location">
          <p>
            <FaMapMarkerAlt /> {items.city}, {items.country}
          </p>
        </div>
        <p className="car-price">${items.dailyRate} /Day</p>
      </div>
    </div>
  );
}

export default CarCard;
