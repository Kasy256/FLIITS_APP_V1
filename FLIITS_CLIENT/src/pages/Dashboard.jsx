import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "../styles/Dashboard.css";
import DashboardSidebar from "../components/DashboardSidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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


  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <DashboardSidebar />
      </aside>

      {/* Header Sectiion */}
      <main className="main-content">
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

        {/* Main Content Section */}
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
        </div>

        <div className="chart-section">
          <h3>Weekly Earnings</h3>
          <div className="chart">{/* Render chart bars */}</div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>License ID</th>
                <th>Date</th>
                <th>Amount Paid ($)</th>
                <th>Car Status</th>
              </tr>
            </thead>
            <tbody>{/* Render customer data */}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
