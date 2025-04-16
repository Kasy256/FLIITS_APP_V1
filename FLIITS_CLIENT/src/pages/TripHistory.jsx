import { useState, useEffect } from "react";
import { FaBars, FaSearch, FaChevronDown } from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/TripHistory.css";

const TripHistory = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 5 days");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCarModelDropdown, setShowCarModelDropdown] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/userdata`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const name = user?.fullName || "Kasy";
  const email = user?.email || "kasyjonan@email.com";

  const trips = [
    {
      customerName: "JoeBiden",
      carModel: "Bez 2021",
      date: "15feb-22mar",
      licensePlate: "UBA111A",
      amount: "$300",
      status: "Complete",
    },
    {
      customerName: "Martin",
      carModel: "Bez 2021",
      date: "15feb-22mar",
      licensePlate: "UBA111A",
      amount: "$300",
      status: "Complete",
    },
    // Add more trips as needed
  ];

  const filteredTrips = trips.filter((trip) => {
    const query = searchQuery.toLowerCase();
    return (
      trip.customerName.toLowerCase().includes(query) ||
      trip.carModel.toLowerCase().includes(query) ||
      trip.date.toLowerCase().includes(query) ||
      trip.licensePlate.toLowerCase().includes(query) ||
      trip.amount.toLowerCase().includes(query) ||
      trip.status.toLowerCase().includes(query)
    );
  });

  const dateRangeOptions = [
    "Last 5 days",
    "Last 15 days",
    "Last 30 days",
    "Last 3 months",
    "All time",
  ];

  const handleDateRangeSelect = (option) => {
    setDateRange(option);
    setShowDateDropdown(false);
  };

  return (
    <div className="main">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header Section */}
        <header className="Dashboard-header">
          <div className="user-info">
            <div className="avatar">
              <img src="/review 1.jpg" alt="profile" className="Profile" />
            </div>
            <div>
              <h1 className="header-name">
                Hello, {loading ? "Loading..." : name}
              </h1>
              <p className="header-email">
                {loading ? "Fetching data..." : email}
              </p>
            </div>
          </div>
          <div className="notifications">
            <button>🔔</button>
            <button>✉️</button>
          </div>
          <FaBars
            className="header-nav"
            id="header-nav"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        </header>

        {/* Title Section */}
        <div className="page-title">
          <h2 className="trip-history-title">Trip History</h2>
        </div>

        {/* Filter Section */}
        <div className="trip-history-filters">
          {/* Search Input */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Dropdowns */}
          <div className="filter-options">
            {/* Date Range Dropdown */}
            <div className="date-filter">
              <div
                className="date-dropdown"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
              >
                <span>{dateRange}</span>
                <span className="calendar-icon">📅</span>
              </div>
              {showDateDropdown && (
                <div className="dropdown-menu date-dropdown-menu">
                  {dateRangeOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleDateRangeSelect(option)}
                      className={option === dateRange ? "selected" : ""}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Car Model Dropdown */}
            <div className="car-model-filter">
              <div
                className="car-model-dropdown"
                onClick={() => setShowCarModelDropdown(!showCarModelDropdown)}
              >
                <span>Car Model</span>
                <FaChevronDown />
              </div>
              {showCarModelDropdown && (
                <div className="dropdown-menu">
                  <div onClick={() => setShowCarModelDropdown(false)}>All</div>
                  <div onClick={() => setShowCarModelDropdown(false)}>Bez 2021</div>
                  <div onClick={() => setShowCarModelDropdown(false)}>Tesla Model 3</div>
                  <div onClick={() => setShowCarModelDropdown(false)}>Toyota Camry</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="trip-table">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Car Model</th>
                <th>Date (From - To)</th>
                <th>License Plate</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <tr key={index}>
                    <td>{trip.customerName}</td>
                    <td>{trip.carModel}</td>
                    <td>{trip.date}</td>
                    <td>{trip.licensePlate}</td>
                    <td>{trip.amount}</td>
                    <td>{trip.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No trips found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TripHistory;
