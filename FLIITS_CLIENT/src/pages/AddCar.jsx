import { useState, useEffect } from "react";
import '../styles/AddCar.css';
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Card from '../components/Card';
import VehicleTable from "../components/VehicleTable";

const DashboardProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [vehicles] = useState({
    listed: 5,
    available: 3,
    booked: 2,
    details: [
      { id: 1, model: 'Mercedes Benz GLE', year: 2019, type: 'SUV', plate: 'UBA 111A', price: '$50/day', status: 'Available' },
      { id: 2, model: 'Toyota Camry', year: 2020, type: 'Sedan', plate: 'UBA 222B', price: '$40/day', status: 'Available' },
      { id: 3, model: 'Honda CR-V', year: 2021, type: 'SUV', plate: 'UBA 333C', price: '$45/day', status: 'Not Available' },
      { id: 4, model: 'Ford Mustang', year: 2018, type: 'Sports', plate: 'UBA 444D', price: '$60/day', status: 'Damaged' },
    ]
  });
  
  const navigate = useNavigate();

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

  const handleAddCar = () => {
    navigate('/car-listing');
  };

  const handleEditCar = (carId) => {
    // Handle edit logic here
    console.log('Editing car with ID:', carId);
    navigate(`/edit-car/${carId}`);
  };

  return (
    <div className='dashboard'>
      <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <DashboardSidebar />
      </aside>
      

      {/* Header Section */}
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
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        </header>

        {/* Main Content Section */}
        <div className="All-Main-Content">
          <div className="stats-grid">
            <Card 
              title="Listed Cars" 
              value={vehicles.listed} 
              unit="Cars" 
              color="primary"
            />
            <Card 
              title="Available Cars" 
              value={vehicles.available} 
              unit="Cars" 
              color="success"
            />
            <Card 
              title="Booked Cars" 
              value={vehicles.booked} 
              unit="Cars" 
              color="warning"
            />
          </div>
          
          {/* Vehicle Table Section */}
          <VehicleTable 
            vehicles={vehicles.details} 
            onAddCar={handleAddCar}
            onEditCar={handleEditCar}
          />
        </div>
        
      </main>
    </div>
  );
};

export default DashboardProfile;