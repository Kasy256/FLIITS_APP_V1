import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";

const HelpPage =()=> {

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
    <div className='dashboard'>
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
        <div className="All-Main-Content">

        </div>
        </main>
    </div>
  )
}

export default HelpPage