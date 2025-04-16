import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "../styles/Dashboard.css";
import DashboardSidebar from "../components/DashboardSidebar";

// Sample bookings data (replace with your actual source or import)
const bookingsData = [
  { id: 1, customer: "John", status: "Pending" },
  { id: 2, customer: "Jane", status: "Confirmed" },
  { id: 3, customer: "Alice", status: "Cancelled" },
  { id: 4, customer: "Mike", status: "Complete" },
  { id: 5, customer: "Sarah", status: "Pending" },
  { id: 6, customer: "Daniel", status: "Confirmed" },
  { id: 7, customer: "Liam", status: "Complete" },
  { id: 8, customer: "Emma", status: "Pending" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const name = user?.fullName || "Kasy";
  const email = user?.email || "jonanrayan06@gmail.com";

  const statusCounts = bookingsData.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  const totalBookings =
    selectedStatus === "All"
      ? bookingsData.length
      : bookingsData.filter((b) => b.status === selectedStatus).length;

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <DashboardSidebar />
      </aside>

      <main className="main-content">
        {/* Header */}
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

        {/* Balance + Bookings Summary */}
        <div className="balance-section">
          <div className="balance-card">
            <h3>Available Balance</h3>
            <div className="balance-amount">
              <span className="amount">$18,560.43</span>
              <span className="change positive">↑ 5.6% vs last month</span>
            </div>
          </div>
          <div className="balance-card">
            <h3>Weekly Total Earnings</h3>
            <div className="balance-amount">
              <span className="amount">$700</span>
              <span className="change positive">↑ 1.6% vs last week</span>
            </div>
          </div>

          {/* Dynamic Bookings Card */}
          <div className="balance-card">
            <h3>Bookings</h3>
            <div className="booking-card-content">
              <div className="booking-count">
                <span className="count">{totalBookings}</span> Orders
              </div>
              <div className="booking-status">
                {["All", "Pending", "Confirmed", "Complete"].map((status) => (
                  <label key={status}>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={() => setSelectedStatus(status)}
                      style={
                        status === "Complete"
                          ? { accentColor: "green" }
                          : undefined
                      }
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Chart Section */}
        <div className="chart-section">
          <h3>Weekly Earnings</h3>
          <div className="chart">{/* Render chart bars */}</div>
        </div>
      </main>
    </div>
  );
}
