import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/RentalDetail.css';

const RentalDetail = () => {
  const location = useLocation(); 
  const { searchParams } = location.state || {}; 

  const [pickupDate, setPickupDate] = useState(searchParams?.startDate || '');
  const [returnDate, setReturnDate] = useState(searchParams?.endDate || '');
  const [pickupLocation, setPickupLocation] = useState(searchParams?.location || '');
  const [returnLocation, setReturnLocation] = useState(''); 

  useEffect(() => {
    if (searchParams) {
      setPickupDate(searchParams.startDate);
      setReturnDate(searchParams.endDate);
      setPickupLocation(searchParams.location);
      setReturnLocation(searchParams.location); 
    }
  }, [searchParams]);

  return (
    <div className='rental-detail-container'>
      <h1>Rental Details</h1>
      <hr />
      <div>
        <h3>Pickup & Return Date/Time</h3>
        <div className='pickup-return-dateTime'>
          <div className='From'>
            <p className='DateTime-title'>From</p>
            <p className='DateTime-results'>
              <p>{pickupDate}</p>
              <p>{searchParams?.startTime || 'N/A'}</p>
            </p>
          </div>
          <div className='To'>
            <p className='DateTime-title'>To</p>
            <p className='DateTime-results'>
              <p>{returnDate}</p>
              <p>{searchParams?.endTime || 'N/A'}</p>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3>Pickup & Return Location</h3>
        <div className='pickup-return-dateTime'>
          <div className='From'>
            <p className='DateTime-results'>
              <p>{pickupLocation}</p>
            </p>
          </div>
          <div className='To'>
            <p className='DateTime-results'>
              <p>{returnLocation}</p>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className='DateTime-results-total'>
          <h2>Total Days/Hours: </h2>
          <p>1 Day</p>
          <p>12 Hours</p>
        </p>
      </div>
    </div>
  );
};

export default RentalDetail;
