import React, { useState } from 'react';
import '../styles/CancellationPolicy.css'

const CancellationPolicy = () => {
    const [showMore, setShowMore] = useState(false);

    const handleLearnMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='cancellation-policy-container'>
            <h1>Cancellation Policy</h1>
            <hr />
            <p className='policy-text'>Free cancellation within 24 hours of booking. Partial refunds available for cancellations made at least 48 hours before pick-up. No refunds for last-minute cancellations or no-shows</p>
            <button className='showMore-Less' onClick={handleLearnMore}>
                {showMore ? 'Show Less' : 'Learn More'}
            </button>
            {showMore && (
                <div>
                    <p className='policy-text'>You can cancel within 24 hours of booking for a full refund. After 24 hours, cancellations made at least 48 hours before pick-up receive a 50% refund, while those made less than 48 hours before pick-up are non-refundable. No refunds are given for no-shows. Changes to bookings depend on availability and may incur extra charges. In case of emergencies or unforeseen events, contact our support team. FLiiTS may update this policy at any time, so please check for the latest version before booking.</p>
                </div>
            )}
        </div>
    );
};

export default CancellationPolicy;