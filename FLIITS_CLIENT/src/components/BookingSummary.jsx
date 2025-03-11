import React, { useEffect, useState } from 'react';
import '../styles/BookingSummary.css';

const BookingSummary = () => {
    const [car, setCar] = useState(null);
    const [host, setHost] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const carResponse = await fetch('/api/cars');  
                const carData = await carResponse.json();
                setCar(carData[0]);  

                // Simulating host info - you can fetch it from your API too
                const hostInfo = {
                    fullName: 'Kasy Jonan',
                    phone: '(256) 704361827',
                    email: 'fliits@gmail.com'
                };
                setHost(hostInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!car || !host) {
        return <div>Loading...</div>;
    }

    return (
        <div className='summary-container'>
            <h1>Booking Summary</h1>
            <hr />
            <div className='car-section'>
                <img src={`http://localhost:5000/${car.carPhotos.frontView}`} alt='Car image' />
                <div>
                    <h2>{car.model} {car.year}</h2>
                    <div className="basic-feature">
                        <p>{car.type}</p>
                        <p>{car.fuelType}</p>
                        <p>{car.seats} seats</p>
                    </div>
                    <p className='features-section'>Features: </p>
                        <p>{car.features.join(',  ')}</p>
                </div>
            </div>
            <div className='host-info'>
                <h3>Host Information</h3>
                <div className="hostlabel">
                    <div className="host-details">
                        <p className='H-title'>Full Name</p>
                        <p className='H-reply'>{host.fullName}</p>
                    </div>
                    <div className="host-details">
                        <p className='H-title'>Phone Number</p>
                        <p className='H-reply'>{host.phone}</p>
                    </div>
                    <div className="host-details">
                        <p className='H-title'>Email</p>
                        <p className='H-reply'><a href={`mailto:${host.email}`}>{host.email}</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSummary;
