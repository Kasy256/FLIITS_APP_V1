import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PriceDetail.css';

const PriceDetail = () => {
    const location = useLocation();
    const { totalPrice } = location.state || { totalPrice: 0 };

    // Calculate other charges based on total price
    const taxAndServiceFee = totalPrice * 0.1; // 10% of base price
    const insurance = totalPrice * 0.05; // 5% of base price
    const fuelCharges = 10; // Fixed fuel charge
    const discount = totalPrice * 0.02; // 2% discount

    // Calculate final total
    const finalTotal = totalPrice + taxAndServiceFee + insurance + fuelCharges - discount;

    return (
        <div className="price-detail-container">    
            <h2>Price Details</h2>
            <hr />
            <div className="receipt-item">
                <span className="receipt-title">Base Price</span>
                <span className="price">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="receipt-item">
                <span className="receipt-title">Tax & Service Fee (10%)</span>
                <span className="price">${taxAndServiceFee.toFixed(2)}</span>
            </div>
            <div className="receipt-item">
                <span className="receipt-title">Insurance (5%)</span>
                <span className="price">${insurance.toFixed(2)}</span>
            </div>
            <div className="receipt-item">
                <span className="receipt-title">Fuel Charges</span>
                <span className="price">${fuelCharges.toFixed(2)}</span>
            </div>
            <div className="receipt-item">
                <span className="receipt-title">Discount (2%)</span>
                <span className="price">-${discount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="receipt-item total">
                <span className="receipt-title-total">Total Price</span>
                <span className="price-total">${finalTotal.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default PriceDetail;