import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import cardata from '../components/cardata';
import '../styles/AfterSearch.css';
import CarCard from '../components/CarCard';

function AfterSearch() {
    const location = useLocation();
    const { searchParams } = location.state || { searchParams: {} };

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);


    const carCards = cardata.map(items => {
        return (
            <CarCard
                key={items.id}
                items={items}
            />
        );
    });

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
                    {carCards}
                </div>
            </div>
        </div>
    );
}

export default AfterSearch;