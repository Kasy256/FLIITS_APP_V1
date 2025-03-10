import React, { useState } from 'react';
import '../styles/PaymentMethod.css';

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodClick = (method) => {
        setSelectedMethod(method);
    };

    return (
        <div className='payment-method-container'>
            <h2>Payment Method</h2>
            <hr />
            <div className='payment-method-buttons'>
                <button id='cash-button' onClick={() => handleMethodClick('cash')}>Cash</button>
                <button id='visa-button' onClick={() => handleMethodClick('visa')}>Visa</button>
                <button id='airtel-button' onClick={() => handleMethodClick('airtel')}>Airtel</button>
                <button id='mtn-button' onClick={() => handleMethodClick('mtn')}>MTN</button>
            </div>
            {selectedMethod === 'visa' && (
                <div className='visa-details'>
                    <h3>Visa Details</h3>
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Expiry Date" />
                    <input type="text" placeholder="CVV" />
                </div>
            )}
            {(selectedMethod === 'airtel' || selectedMethod === 'mtn') && (
                <div className='mobile-money-details'>
                    <h3>Phone Number</h3>
                    <input type="text" placeholder="Phone Number" />
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;