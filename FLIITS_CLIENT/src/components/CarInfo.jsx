import { useState, useEffect } from 'react';
import { FaMedal, FaGasPump, FaCouch, FaStar, FaCogs, FaCarSide, FaMapMarkerAlt, FaPlay, FaSnowflake, FaBatteryFull, FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CarInfoPage.css';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios'; // Make sure to install axios

function CarInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [car, setCar] = useState(location.state?.car || null); // State to hold car details
  const navigate = useNavigate();
  const { carId } = useParams(); // Assuming carId is passed in the URL params

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch car details using the carId from URL params
    if (carId) {
      axios.get(`/api/cars/${carId}`) // Adjust API endpoint accordingly
        .then(response => {
          console.log("resi",response.data)
          setCar(response.data); // Update state with the fetched data
        })
        .catch(error => {
          console.error('Error fetching car details:', error);
        });
    }
  }, [carId]);

  const handleBookClick = () => {
    if (isLoggedIn) {
      navigate('/PaymentPage');
    } else {
      navigate(`/Login?redirect=/PaymentPage`);
    }
  };

  if (!car) {
    return <div>Loading...</div>; // Show loading while car data is being fetched
  }

  return (
    <div>
      <div className="car-pics">
        <div className="main-pic-section">
          <img src={car.carPhotos?.frontView} alt="Car pic" className="Main-pic" />
        </div>
        <div className="more-pics">
          <img src={car.carPhotos?.leftSideView} alt="Car pic" className="sub-pics" />
          <img src={car.carPhotos?.frontInterior} alt="Car pic" className="sub-pics" />
        </div>
      </div>

      <div className="car-info-section">
        <div className="car-profile">
          <h4 className="car-model">{car.model}</h4>
          <div className="key-features">
            <h5 className="feature">{car.rating} <FaStar className="icons" /></h5>
            <h5 className="feature"><FaMedal className="icons" /> {car.trip} Trips</h5>
            <h5 className="feature"><FaCouch className="icons" /> {car.seats} Seats</h5>
            <h5 className="feature"><FaGasPump className="icons" /> {car.fuelType}</h5>
          </div>
          <div className="host-profile">
            <div className="host">
              <img src="/team2.jpg" className="profile-pic" alt="profile picture" />
              <div className="host-name">
                <h4 className="names">{car.host_name} <FaMedal /></h4>
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
              <p key={index} className="feature"><FaCogs className="icons" /> {feature}</p>
            ))}
          </div>

          <p className="description-heading">Conditions</p>
          <div className="conditions">
            {car.renterConditions.map((condition, index) => (
              <p key={index} className="feature"><FaCheck className="icons" /> {condition}</p>
            ))}
          </div>
        </div>

        <div className="car-pricing">
          <div className="total-price">
            <p className="price">${car.dailyRate}</p>
            <p className="booked-days">{car.availabilityDays} Days, {car.availabilityHours} Min</p><br />
            <button onClick={handleBookClick} className="booking-button">Book</button>
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
