import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import axios from 'axios';
import '../styles/AfterSearch.css';
import CarCard from '../components/CarCard';

function AfterSearch() {
    const location = useLocation();
    const { searchParams } = location.state || { searchParams: {} };

    const [carData, setCarData] = useState([]); 
    const [filteredCars, setFilteredCars] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch car data from the backend API
        const fetchCarData = async () => {
            try {
                const response = await axios.get('/api/cars'); 
                setCarData(response.data); 
            } catch (error) {
                setError('Failed to load car data.'); 
                console.error(error);
            } finally {
                setLoading(false); 
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
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
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
                                key={items._id} 
                                items={items}
                            />
                        ))
                    ) : (
                        <div>No cars available for the selected location.</div> 
                    )}
                </div>
            </div>
        </div>
    );
}

export default AfterSearch;
