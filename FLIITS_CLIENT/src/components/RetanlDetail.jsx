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
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (searchParams) {
      setPickupDate(searchParams.startDate);
      setReturnDate(searchParams.endDate);
      setPickupLocation(searchParams.location);
      setReturnLocation(searchParams.location); 

      // Calculate total days and hours
      if (searchParams.startDate && searchParams.startTime && 
          searchParams.endDate && searchParams.endTime) {
        const fromDateTime = new Date(`${searchParams.startDate}T${searchParams.startTime}`);
        const toDateTime = new Date(`${searchParams.endDate}T${searchParams.endTime}`);

        const timeDiff = toDateTime - fromDateTime;
        if (timeDiff > 0) {
          const totalMillisecondsInDay = 1000 * 60 * 60 * 24;
          const totalDaysBooked = Math.floor(timeDiff / totalMillisecondsInDay);
          const totalHoursBooked = Math.floor(
            (timeDiff % totalMillisecondsInDay) / (1000 * 60 * 60)
          );

          setTotalDays(totalDaysBooked);
          setTotalHours(totalHoursBooked);
        }
      }
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
          <p>{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</p>
          <p>{totalHours} {totalHours === 1 ? 'Hour' : 'Hours'}</p>
        </p>
      </div>
    </div>
  );
};

export default RentalDetail;
