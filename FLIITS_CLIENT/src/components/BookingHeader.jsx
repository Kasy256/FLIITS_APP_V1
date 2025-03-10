import React, { useState, useEffect } from 'react';
import '../styles/BookingHeader.css';
import { FaBars, FaTimes, FaSearch, FaUserPlus, FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import NavMenu from './NavMenu';

const BookingHeader = () => {
  // const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [location, setLocation] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
   const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = { location, startDate, endDate, startTime, endTime };
    navigate('/AfterSearch', { state: { searchParams } });
  };

  return (
    <div className="headercontainer">
      <div className="logo">
        <Link to="/" className="logo-link">
          FL<span style={{ color: 'gold' }}>ii</span>TS
        </Link>
      </div>
      <form className="bookingHeader" onSubmit={handleSubmit}>
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
        <div className="dates">
                  <div className="booking-inputs">
                  <label className='booking-label'>From</label>
                    <input
                      type="text"
                      name="start"
                      placeholder="Add Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onFocus={(e) => (e.target.type = 'date')}
                      required
                    />
                    <input
                      type="text"
                      name="startTime"
                      placeholder="Add Time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      onFocus={(e) => (e.target.type = 'time')}
                      required
                    />
                  </div>
                </div>
      
                <div className="time">
                  <div className="booking-inputs">
                  <label className='booking-label'>To</label>
                    <input
                      type="text"
                      name="stop"
                      placeholder="Add Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      onFocus={(e) => (e.target.type = 'date')}
                      required
                    />
                    <input
                      type="text"
                      name="stopTime"
                      placeholder="Add Time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      onFocus={(e) => (e.target.type = 'time')}
                      required
                    />
                  </div>
                </div>
        <button type="submit" id="Booking-search">
          <FaSearch />
        </button>
      </form>
      <ul>
        <li>
          {!user ? (
            <Link to="/Login">
             <FaUserPlus
              className="header-icon"
              id="acc-menu-icon"
            />
            </Link>
          ) : (
            <div className="avatar-dropdown">
              <img
                src={user.photoURL || "/review 1.jpg"}
                alt="profile"
                className="Profile-avatar"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/Dashboard" className="dropdown-item">
                    <FaHome className="Dashboard-icons" />
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    <FaUser className="Dashboard-icons" />
                    Profile
                  </Link>
                  <button
                    className="loggout dropdown-item"
                    onClick={() => {
                      auth.signOut();
                      setUser(null);
                    }}
                  >
                    <FaSignOutAlt className="Dashboard-icons" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BookingHeader;
