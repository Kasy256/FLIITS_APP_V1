import { useState, useEffect } from 'react';
import { FaMedal, FaGasPump, FaCouch, FaStar, FaCogs, FaCarSide, FaMapMarkerAlt, FaPlay, FaSnowflake, FaBatteryFull, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CarInfoPage.css';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function CarInfo({ items }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleBookClick = () => {
    if (isLoggedIn) {
      navigate('/PaymentPage');
    } else {
      navigate(`/Login?redirect=/PaymentPage`);
    }
  };

  return (
    <div>
      <div className="car-pics">
        <div className="main-pic-section">
          <img src='/benz.jfif' alt='car pic' className="Main-pic" />
        </div>
        <div className="more-pics">
          <img src='/benz side view.webp' alt='car pic' className="sub-pics" />
          <img src='/benz-interior.jpg' alt='car pic' className="sub-pics" />
        </div>
      </div>

      <div className="car-info-section">
        <div className="car-profile">
          <h4 className='car-model'>{items.name}</h4>
          <div className="key-features">
            <h5 className='feature'>{items.rating} <FaStar className='icons' /></h5>
            <h5 className='feature'><FaMedal className='icons' /> {items.trip} Trips</h5>
            <h5 className='feature'><FaCouch className='icons' /> {items.seats} Seats</h5>
            <h5 className='feature'><FaGasPump className='icons' /> {items.fuel}</h5>
          </div>
          <div className="host-profile">
            <div className="host">
              <img src='/team2.jpg' className='profile-pic' alt='profile picture' />
              <div className="host-name">
                <h4 className='names'>{items.host_name} <FaMedal /></h4>
                <p className='host-year'>Host since {items.join_year}</p>
              </div>
            </div>
            <div className="ownership">
              <p>{items.ownership}</p>
            </div>
          </div>

          <p className='description-heading'>Description</p>
          <p className='car-description'>{items.description}</p>

          <p className='description-heading'>More Features</p>
          <div className="more-features">
            <p className='feature'><FaCogs className='icons' /> Automatic</p>
            <p className='feature'><FaCarSide className='icons' /> All-Wheel drive</p>
            <p className='feature'><FaMapMarkerAlt className='icons' /> GPS</p>
            <p className='feature'><FaPlay className='icons' /> Apple CarPlay</p>
            <p className='feature'><FaSnowflake className='icons' /> Air Conditioning</p>
            <p className='feature'><FaBatteryFull className='icons' /> Wireless Charging</p>
          </div>
          <p className='description-heading'>Conditions</p>
          <div className="conditions">
            <p className='feature'><FaCheck className='icons' /> 25 years old minimum</p>
            <p className='feature'><FaCheck className='icons' /> Valid Driving Licence</p>
          </div>
        </div>

        <div className="car-pricing">
          <div className="total-price">
            <p className='price'>${items.total_price}</p>
            <p className='booked-days'>{items.total_days} Days, {items.total_time} Min</p><br />
            <button onClick={handleBookClick} className='booking-button'>Book</button>
          </div>

          <div className="booking-date-time">
            <p className='from-to-date'>From</p>
            <div className="date-time-input">
              <input type='date' className='book-date-time' />
              <input className='book-date-time' type='time' />
            </div>
            <p className='from-to-date'>To</p>
            <div className="date-time-input">
              <input type='date' className='book-date-time' />
              <input className='book-date-time' type='time' />
            </div>
          </div>

          <p className='booking-location'>Pickup & return Location</p>
          <input className='booked-location' type='text' />

          <div className="inquires-section">
            <button className='inquires-button'>Inquires</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;