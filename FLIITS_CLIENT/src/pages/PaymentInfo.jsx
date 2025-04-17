import {useEffect, useState} from 'react';
import PaymentHeader from '../components/PaymentHeader';
import '../styles/PaymentInfo.css';
import BookingSummary from '../components/BookingSummary';
import PriceDetail from '../components/PriceDetail';
import TermsAndConditions from '../components/T&C';
import RentalDetail from '../components/RetanlDetail';
import PaymentMethod from '../components/PaymentMethod';
import CancellationPolicy from './CancellationPolicy';
import { useLocation } from 'react-router-dom';

const PaymentInfo = () => {
    const location = useLocation();
    const [car, setCar] = useState(null);
    const [host, setHost] = useState(null);
    const [rentalDetails, setRentalDetails] = useState({
        pickupDate: '',
        returnDate: '',
        pickupLocation: '',
        returnLocation: '',
        totalDays: 0,
        totalHours: 0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Fetch car and host data
        const fetchData = async () => {
            try {
                const carResponse = await fetch("/api/cars");
                const carData = await carResponse.json();
                setCar(carData[0]);

                // Simulating host info - you can fetch it from your API too
                const hostInfo = {
                    fullName: "Kasy Jonan",
                    phone: "(256) 704361827",
                    email: "fliits@gmail.com",
                };
                setHost(hostInfo);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Set rental details from location state
        if (location.state?.searchParams) {
            const { startDate, endDate, location: pickupLocation } = location.state.searchParams;
            setRentalDetails({
                pickupDate: startDate,
                returnDate: endDate,
                pickupLocation: pickupLocation,
                returnLocation: pickupLocation,
                totalDays: 0, // These will be calculated in RentalDetail component
                totalHours: 0
            });
        }
    }, [location.state]);

    return(
        <div className="paymentcontainer">
            <PaymentHeader />

            <div className="page-content">
                <div className="leftside-content">
                    <BookingSummary />
                    <RentalDetail />
                    <PaymentMethod />
                    <CancellationPolicy />
                </div>
                <div className="rightside-content">
                    <PriceDetail />
                    {car && host && (
                        <TermsAndConditions 
                            car={car}
                            host={host}
                            rentalDetails={rentalDetails}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;