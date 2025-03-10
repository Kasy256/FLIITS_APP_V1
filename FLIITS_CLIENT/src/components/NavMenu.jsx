import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaInfoCircle, FaCalculator, FaHeadset, FaTools, FaBriefcase } from 'react-icons/fa'; 
import '../styles/NavMenu.css';

const NavMenu = ({ onClose, onLinkClick }) => {
  return (
    <div className="menu-content">
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaCar size={25} />
        <Link to="/Carshare">Be a Host</Link>
      </div>
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaInfoCircle size={25} />
        <Link to="/about">About</Link>
      </div>
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaCalculator size={25} />
        <Link to="/calculator">Calculator</Link>
      </div>
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaHeadset size={25} />
        <Link to="/contact">Contact Support</Link>
      </div>
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaTools size={25} />
        <Link to="/tools">Tools</Link>
      </div>
      <div className="nav-links" onClick={() => { onLinkClick(); onClose(); }}>
        <FaBriefcase size={25} />
        <Link to="/careers">Careers</Link>
      </div>
    </div>
  );
};

export default NavMenu;