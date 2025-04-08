import { useState, useEffect } from "react";
import {
  FaMedal,
  FaGasPump,
  FaCouch,
  FaStar,
  FaCogs,
  FaCarSide,
  FaMapMarkerAlt,
  FaPlay,
  FaSnowflake,
  FaBatteryFull,
  FaCheck,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CarInfoPage.css";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import PaymentHeader from "../components/PaymentHeader";
import axios from "axios";

function CarInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [car, setCar] = useState(location.state.car);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State for storing the total price
  const [totalDays, setTotalDays] = useState(0); // State for total days
  const [totalHours, setTotalHours] = useState(0); // State for total hours
  const navigate = useNavigate();
 

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch car details and calculate total price based on searchParams
  useEffect(() => {
    console.log(car)   
    setLoading(false);                                                               
    // Extract searchParams from location state
    const { startDate, startTime, endDate, endTime } =
      location.state?.searchParams || {};
console.log("gyat",location.state?.searchParams,car )
    if (startDate && startTime && endDate && endTime) {
      // Debugging: Log the extracted dates and times
      console.log("Start Date:", startDate);
      console.log("Start Time:", startTime);
      console.log("End Date:", endDate);
      console.log("End Time:", endTime);

      // Ensure the values are correctly formatted for date calculations
      const fromDateTime = new Date(`${startDate}T${startTime}`);
      const toDateTime = new Date(`${endDate}T${endTime}`);

      // Debugging: Log the resulting Date objects
      console.log("From DateTime:", fromDateTime);
      console.log("To DateTime:", toDateTime);

      // Calculate difference in time
      const timeDiff = toDateTime - fromDateTime;

      if (timeDiff < 0) {
        setError("End date/time must be after start date/time");
        setLoading(false);
        return;
      }

      // Calculate total days and hours
      const totalMillisecondsInDay = 1000 * 60 * 60 * 24;
      const totalDaysBooked = Math.floor(timeDiff / totalMillisecondsInDay);
      const totalHoursBooked = Math.floor(
        (timeDiff % totalMillisecondsInDay) / (1000 * 60 * 60)
      );

      setTotalDays(totalDaysBooked);
      setTotalHours(totalHoursBooked);

      // Calculate total price based on daily rate
      const price =
        car.dailyRate * totalDaysBooked +
        (car.dailyRate / 24) * totalHoursBooked;
      setTotalPrice(price);
    }
  }, [location.state]);

  // Handle the booking button click
  const handleBookClick = () => {
    if (isLoggedIn) {
      navigate("/PaymentPage");
    } else {
      navigate(`/Login?redirect=/PaymentPage`);
    }
  };

  // Show loading message if the car data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error fetching the car data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no car data is available, show a message
  if (!car) {
    return <div>No car data found</div>;
  }

  return (
    <div>
      <PaymentHeader />
      <div className="car-pics">
        <div className="main-pic-section">
          <img
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              car.carPhotos.frontView
            }`}
            alt="Car pic"
            className="Main-pic"
          />
        </div>
        <div className="more-pics">
          <img
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              car.carPhotos.leftSideView
            }`}
            alt="Car pic"
            className="sub-pics"
          />
          <img
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              car.carPhotos.rightSideView
            }`}
            alt="Car pic"
            className="sub-pics"
          />
        </div>
      </div>

      <div className="car-info-section">
        <div className="car-profile">
          <h4 className="car-model">{car.model}</h4>
          <div className="key-features">
            <h5 className="feature">
              {car.rating} <FaStar className="icons" />
            </h5>
            <h5 className="feature">
              <FaMedal className="icons" /> {car.trip} Trips
            </h5>
            <h5 className="feature">
              <FaCouch className="icons" /> {car.seats} Seats
            </h5>
            <h5 className="feature">
              <FaGasPump className="icons" /> {car.fuelType}
            </h5>
          </div>
          <div className="host-profile">
            <div className="host">
              <img
                src="/team2.jpg"
                className="profile-pic"
                alt="profile picture"
              />
              <div className="host-name">
                <h4 className="names">
                  {car.host_name} <FaMedal />
                </h4>
                <p className="host-year">Host since {car.join_year}</p>
              </div>
            </div>
            <div className="ownership">
              <p>{car.ownership}</p>
            </div>
          </div>

          <p className="description-heading">Description</p>
          <p className="car-description">{car.carDescription}</p>

          <p className="description-heading">More Features</p>
          <div className="more-features">
            {car.features.map((feature, index) => (
              <p key={index} className="feature">
                <FaCogs className="icons" /> {feature}
              </p>
            ))}
          </div>

          <p className="description-heading">Conditions</p>
          <div className="conditions">
            {car.renterConditions &&
            ((Array.isArray(car.renterConditions) &&
              car.renterConditions.length > 0) ||
              (typeof car.renterConditions === "string" &&
                car.renterConditions.trim() !== "")) ? (
              Array.isArray(car.renterConditions) ? (
                car.renterConditions.map((condition, index) => (
                  <p key={index} className="feature">
                    <FaCheck className="icons" /> {condition}
                  </p>
                ))
              ) : (
                <p className="feature">
                  <FaCheck className="icons" /> {car.renterConditions}
                </p>
              )
            ) : (
              <p>No conditions available</p>
            )}
          </div>
        </div>

        <div className="car-pricing">
          <div className="total-price">
            <p className="price">${totalPrice.toFixed(2)}</p>
            <p className="booked-days">
              {totalDays} Days, {totalHours} Hours
            </p>
            <br />
            <button onClick={handleBookClick} className="booking-button">
              Book
            </button>
          </div>

          <div className="booking-date-time">
            <p className="from-to-date">From</p>
            <div className="date-time-input">
              <input type="date" className="book-date-time" />
              <input className="book-date-time" type="time" />
            </div>
            <p className="from-to-date">To</p>
            <div className="date-time-input">
              <input type="date" className="book-date-time" />
              <input className="book-date-time" type="time" />
            </div>
          </div>

          <p className="booking-location">Pickup & return Location</p>
          <input className="booked-location" type="text" />

          <div className="inquires-section">
            <button className="inquires-button">Inquires</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
