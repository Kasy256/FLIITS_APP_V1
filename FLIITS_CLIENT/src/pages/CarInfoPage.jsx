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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const navigate = useNavigate();

  // Initialize search parameters from location state or use empty values
  const [searchParams, setSearchParams] = useState({
    startDate: location.state?.searchParams?.startDate || "",
    startTime: location.state?.searchParams?.startTime || "",
    endDate: location.state?.searchParams?.endDate || "",
    endTime: location.state?.searchParams?.endTime || "",
    location: location.state?.searchParams?.location || "",
  });

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Set loading to false once we have the car data
  useEffect(() => {
    if (car) {
      setLoading(false);
    }
  }, [car]);

  // Calculate total price whenever search parameters change
  useEffect(() => {
    const { startDate, startTime, endDate, endTime } = searchParams;

    if (startDate && startTime && endDate && endTime) {
      const fromDateTime = new Date(`${startDate}T${startTime}`);
      const toDateTime = new Date(`${endDate}T${endTime}`);

      const timeDiff = toDateTime - fromDateTime;

      if (timeDiff < 0) {
        setError("End date/time must be after start date/time");
        return;
      }

      const totalMillisecondsInDay = 1000 * 60 * 60 * 24;
      const totalDaysBooked = Math.floor(timeDiff / totalMillisecondsInDay);
      const totalHoursBooked = Math.floor(
        (timeDiff % totalMillisecondsInDay) / (1000 * 60 * 60)
      );

      setTotalDays(totalDaysBooked);
      setTotalHours(totalHoursBooked);

      const price =
        car.dailyRate * totalDaysBooked +
        (car.dailyRate / 24) * totalHoursBooked;
      setTotalPrice(price);
      setError(null);
    }
  }, [searchParams, car.dailyRate]);

  const handleSearchParamChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle the booking button click
  const handleBookClick = () => {
    if (isLoggedIn) {
      navigate("/PaymentPage", {
        state: {
          car,
          searchParams,
          totalPrice
        }
      });
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
              <input 
                type="date" 
                className="book-date-time" 
                value={searchParams.startDate}
                onChange={(e) => handleSearchParamChange('startDate', e.target.value)}
              />
              <input 
                className="book-date-time" 
                type="time" 
                value={searchParams.startTime}
                onChange={(e) => handleSearchParamChange('startTime', e.target.value)}
              />
            </div>
            <p className="from-to-date">To</p>
            <div className="date-time-input">
              <input 
                type="date" 
                className="book-date-time" 
                value={searchParams.endDate}
                onChange={(e) => handleSearchParamChange('endDate', e.target.value)}
              />
              <input 
                className="book-date-time" 
                type="time" 
                value={searchParams.endTime}
                onChange={(e) => handleSearchParamChange('endTime', e.target.value)}
              />
            </div>
          </div>

          <p className="booking-location">Pickup & return Location</p>
          <input 
            className="booked-location" 
            type="text" 
            value={searchParams.location}
            onChange={(e) => handleSearchParamChange('location', e.target.value)}
          />

          <div className="inquires-section">
            <button className="inquires-button">Inquires</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
