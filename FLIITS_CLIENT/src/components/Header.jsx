import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';
import '../styles/Header.css';
import { FaBars, FaUser, FaHome, FaSignOutAlt,FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import NavMenu from './NavMenu';

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="headercontainer">
      <div className="logo">
        <Link to="/" className="logo-link">
          FL<span style={{ color: 'gold' }}>ii</span>TS
        </Link>
      </div>
      <ShareButton />
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
                  <Link to="/Profile" className="dropdown-item">
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

export default Header;
