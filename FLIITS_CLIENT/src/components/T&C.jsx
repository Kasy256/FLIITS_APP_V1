import React, { useState } from 'react';
import '../styles/TermsAndConditions.css';

const TermsAndConditions = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = () => {
        if (isChecked) {
            alert('Payment Confirmed');
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