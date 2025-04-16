import { useState, useEffect } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/Bookings.css";

const Bookings = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const bookings = {
        Pending: [
            {
                id: 1,
                fromDate: "2025-04-10",
                fromTime: "09:00",
                toDate: "2025-04-12",
                toTime: "17:00",
                location: "Nairobi",
                carModel: "Toyota Camry",
                userName: "John Doe",
            },
            {
                id: 2,
                fromDate: "2025-04-12",
                fromTime: "10:30",
                toDate: "2025-04-15",
                toTime: "14:00",
                location: "Kampala",
                carModel: "Honda CR-V",
                userName: "Jane Smith",
            },
        ],
        Confirmed: [
            {
                id: 3,
                fromDate: "2025-04-08",
                fromTime: "08:00",
                toDate: "2025-04-09",
                toTime: "20:00",
                location: "Dodoma",
                carModel: "Mercedes GLE",
                userName: "Mike Johnson",
            },
        ],
        Cancelled: [
            {
                id: 4,
                fromDate: "2025-04-05",
                fromTime: "11:00",
                toDate: "2025-04-07",
                toTime: "11:00",
                location: "Kigali",
                carModel: "Ford Mustang",
                userName: "Sarah Williams",
            },
        ],
        Complete: [
            {
                id: 5,
                fromDate: "2025-04-01",
                fromTime: "10:00",
                toDate: "2025-04-03",
                toTime: "16:00",
                location: "Mombasa",
                carModel: "BMW X5",
                userName: "Alice Brown",
            },
            {
                id: 6,
                fromDate: "2025-04-01",
                fromTime: "10:00",
                toDate: "2025-04-03",
                toTime: "16:00",
                location: "Mombasa",
                carModel: "BMW X5",
                userName: "Alice Brown",
            },
            {
                id: 7,
                fromDate: "2025-04-01",
                fromTime: "10:00",
                toDate: "2025-04-03",
                toTime: "16:00",
                location: "Mombasa",
                carModel: "BMW X5",
                userName: "Alice Brown",
            },
            {
                id: 8,
                fromDate: "2025-04-01",
                fromTime: "10:00",
                toDate: "2025-04-03",
                toTime: "16:00",
                location: "Mombasa",
                carModel: "BMW X5",
                userName: "Alice Brown",
            },
            {
                id: 9,
                fromDate: "2025-04-01",
                fromTime: "10:00",
                toDate: "2025-04-03",
                toTime: "16:00",
                location: "Mombasa",
                carModel: "BMW X5",
                userName: "Alice Brown",
            },
        ],
    };

    const allBookings = Object.values(bookings).flat();

    const filteredBookings =
        (activeTab === "All" ? allBookings : bookings[activeTab] || []).filter(
            (booking) =>
                booking.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.userName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const getBookingStatus = (id) => {
        for (const status in bookings) {
            if (bookings[status].some((b) => b.id === id)) {
                return status;
            }
        }
        return "Unknown";
    };

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
                if (!response.ok) throw new Error("Failed to fetch user data");
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
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
                <DashboardSidebar />
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="Dashboard-header">
                    <div className="user-info">
                        <div className="avatar">
                            <img src="/review 1.jpg" alt="profile" className="Profile" />
                        </div>
                        <div>
                            <h1 className="header-name">Hello, {loading ? "Loading..." : name}</h1>
                            <p className="header-email">{loading ? "Fetching data..." : email}</p>
                        </div>
                    </div>
                    <div className="notifications">
                        <button>🔔</button>
                        <button>✉️</button>
                    </div>
                    <FaBars className="header-nav" onClick={() => setSidebarVisible(!sidebarVisible)} />
                </header>

                {/* Bookings Main Section */}
                <section className="bookings-main">
                    {/* Bookings Title & Search */}
                    <div className="bookings-header">
                        <h2 className="bookings-title">Bookings</h2>
                        <div className="search-box">
                            <span className="search-icon-wrapper">
                                <FaSearch className="search-icon" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search for trips, users, cars..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="booking-tab-container">
                        {["All", "Pending", "Confirmed", "Cancelled", "Complete"].map((tab, index, arr) => (
                            <div key={tab} style={{ display: "flex", alignItems: "center" }}>
                                <button
                                    className={`tab-button ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                                {index < arr.length - 1 && <div className="tab-divider" />}
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="booking-table">
                        {filteredBookings.length === 0 ? (
                            <p className="no-bookings">No bookings found.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date (From - To)</th>
                                        <th>Location</th>
                                        <th>Car Model</th>
                                        <th>User Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className="date-time-container">
                                                    <div><strong>From:</strong> {booking.fromDate} at {booking.fromTime}</div>
                                                    <div><strong>To:</strong> {booking.toDate} at {booking.toTime}</div>
                                                </div>
                                            </td>
                                            <td>{booking.location}</td>
                                            <td>{booking.carModel}</td>
                                            <td>{booking.userName}</td>
                                            <td>
                                                <span className={`status-brand ${getBookingStatus(booking.id).toLowerCase()}`}>
                                                    {getBookingStatus(booking.id)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
export default Bookings;
