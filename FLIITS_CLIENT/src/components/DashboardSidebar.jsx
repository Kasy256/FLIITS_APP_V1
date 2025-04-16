import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCar,
  FaSearch,
  FaHistory,
  FaMoneyBill,
  FaFileAlt,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const DashboardSidebar = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: <FaHome className="Dashboard-icons" />, path: "/Dashboard" },
    { label: "Profile", icon: <FaUser className="Dashboard-icons" />, path: "/DashboardProfile" },
    { label: "Add/Edit Car", icon: <FaCar className="Dashboard-icons" />, path: "/AddCar" },
    { label: "Listings", icon: <FaSearch className="Dashboard-icons" />, path: "/Bookings" },
    { label: "Trip history", icon: <FaHistory className="Dashboard-icons" />, path: "/TripHistory" },
    { label: "Transactions", icon: <FaMoneyBill className="Dashboard-icons" />, path: "/Dashboard" },
    { label: "Reports", icon: <FaFileAlt className="Dashboard-icons" />, path: "/Dashboard" },
    { label: "Help", icon: <FaQuestionCircle className="Dashboard-icons" />, path: "/Dashboard" },
    { label: "Settings", icon: <FaCog className="Dashboard-icons" />, path: "/Dashboard" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-logo">
        <Link to="/">
          FL<span style={{ color: "gold" }}>ii</span>TS
        </Link>
      </div>
      <nav className="Dashboard-options">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={activeNav === item.label ? "active" : ""}
            onClick={() => setActiveNav(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
