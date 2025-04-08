import React, { useState } from 'react';
import '../styles/TermsAndConditions.css';

const TermsAndConditions = ({ car, host, rentalDetails }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = () => {
        if (isChecked) {
            const bookingInfo = `
Payment Confirmed!

Car Details:
- Model: ${car.model} ${car.year}
- Type: ${car.type}
- Fuel Type: ${car.fuelType}
- Seats: ${car.seats}
- Features: ${car.features.join(", ")}

Host Information:
- Name: ${host.fullName}
- Phone: ${host.phone}
- Email: ${host.email}

Rental Details:
- Pickup Date: ${rentalDetails.pickupDate}
- Return Date: ${rentalDetails.returnDate}
- Pickup Location: ${rentalDetails.pickupLocation}
- Return Location: ${rentalDetails.returnLocation}
- Total Days: ${rentalDetails.totalDays}
- Total Hours: ${rentalDetails.totalHours}
            `;
            alert(bookingInfo);
        } else {
            alert('Please agree to the terms and conditions');
        }
    };

    return (
        <div className='terms-and-conditions-container'>
            <div className='terms-and-conditions'>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <p>By clicking this, I agree to FLiiTS <span style={{color: '#006EFF',fontWeight: 'bold'}}>Terms & Conditions</span> and <span style={{color: '#006EFF',fontWeight: 'bold'}}>Privacy Policy</span></p>
            </div>
            <br />
            <button className= 'pay-button' onClick={handleButtonClick}>Confirm and Pay</button>
        </div>
    );
};

export default TermsAndConditions;