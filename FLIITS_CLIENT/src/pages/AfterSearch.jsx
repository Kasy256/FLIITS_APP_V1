import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import axios from 'axios';
import '../styles/AfterSearch.css';
import CarCard from '../components/CarCard';

function AfterSearch() {
    const location = useLocation();
    const { searchParams } = location.state || { searchParams: {} };

    const [carData, setCarData] = useState([]); // State to hold fetched car data
    const [filteredCars, setFilteredCars] = useState([]); // State to hold filtered car data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch car data from the backend API
        const fetchCarData = async () => {
            try {
                const response = await axios.get('/api/cars'); // Replace with your backend URL if needed
                setCarData(response.data); // Set the fetched data into the state
            } catch (error) {
                setError('Failed to load car data.'); // Handle error
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchCarData();
    }, []);

    // Filter cars based on location and date/time when car data is fetched
    useEffect(() => {
        if (carData.length > 0 && searchParams.location) {
            const filtered = carData.filter((car) => {
                const isLocationMatch = car.city.toLowerCase().includes(searchParams.location.toLowerCase()) || car.country.toLowerCase().includes(searchParams.location.toLowerCase());
                return isLocationMatch;
            });
            setFilteredCars(filtered);
        }
    }, [carData, searchParams]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or loading component
    }

    if (error) {
        return <div>{error}</div>; // Display any errors that occur during fetching
    }

    return (
        <div className='AfterSearch-container'>
            <BookingHeader />
            <div className="search-Container">
                <div className="search-params">
                    <p><label>Location:</label>{searchParams.location}</p>
                    <p><label>Start Date:</label> {searchParams.startDate}</p>
                    <p><label>End Date:</label> {searchParams.endDate}</p>
                    <p><label>Start Time:</label> {searchParams.startTime}</p>
                    <p><label>End Time:</label> {searchParams.endTime}</p>
                </div>
            </div>
            <div className="separater"></div>

            <div className="Search-results">
                <div className="car-results">
                    {filteredCars.length > 0 ? (
                        filteredCars.map((items) => (
                            <CarCard
                                key={items._id} // Assuming that MongoDB ObjectId is being used
                                items={items}
                            />
                        ))
                    ) : (
                        <div>No cars available for the selected location.</div> // Handle no results found
                    )}
                </div>
            </div>
        </div>
    );
}

export default AfterSearch;
