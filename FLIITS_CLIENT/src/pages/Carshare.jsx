import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { FaCar, FaCalendarAlt, FaKey, FaDollarSign, FaHandshake } from 'react-icons/fa';
import FeaturesImage from '../assets/images/car-share.webp'
import '../styles/CarShare.css';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function LandingPage() {
  const [activePackage, setActivePackage] = useState('secure');

  const showSecure = () => setActivePackage('secure');
  const showStandard = () => setActivePackage('standard');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/car-listing');
    } else {
      navigate(`/Login?redirect=/car-listing`);
    }
  };

  return (
    <div className="landing-page">
      <BookingHeader />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-heading">Turn Your Car into Extra Cash!</p>
          <p className="hero-subheading">Share your car, earn effortlessly. No commitments, no hassles just opportunities.</p><br />
          <button onClick={handleButtonClick} className="button-primary">Get Started</button> 
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="feature-section">
        <div className="feature-image">
          <img src={FeaturesImage} alt="Handing over car keys" />
        </div>
        <div className="feature-text">
          <p>
            Unlock the earning potential of your car by sharing it with trusted drivers 
            in your community. Whether you have a second car sitting idle or just want 
            to make the most of your vehicle, <span style={{ fontWeight: 'bold' }}>FL<span className="highlight">ii</span>TS</span> makes 
            it easy and secure to turn your car into a source of extra income.
          </p>
          <p className="feature-cta">Start sharing today and watch your earnings grow!</p>
          <Link to={isLoggedIn ? "/car-listing" : "/Login"}className="button-primary">Get Started</Link> 
        </div>
      </section>

      {/* FLiiTS Packages Section */}
      <section className="packages-section">
        <div className="packages-container">
          {/* Package Buttons */}
          <div className="package-options-buttons">
            <button 
              className={`package-button ${activePackage === 'secure' ? 'active' : ''}`}
              onClick={showSecure}
            >
              <p className="package-title">FL<span style={{ color: 'gold' }}>ii</span>TS Secure</p>
            </button>
            <button 
              className={`package-button ${activePackage === 'standard' ? 'active' : ''}`}
              onClick={showStandard }
            >
              <p className="package-title">FL<span style={{ color: 'gold' }}>ii</span>TS Standard</p>
            </button>
          </div>

          <div className="packages-info">
            {/* FLiiTS Secure */}
            {activePackage === 'secure' && (
              <div className="works-content active" id="fliits-secure">
              <div className="package-container">
                
                {/* Step 1 */}
                <div className="package-content">
                  <div className="package-header">
                    <FaCar className='package-icon' />
                    <div className="header-highlighter"></div>
                  </div>
                  <div className="package-text">
                    <h3>List your car</h3>
                    <p>Provide your car’s essential details, and we’ll schedule a call to arrange the installation of our security device.</p>
                  </div>
                </div>
            
                {/* Step 2 */}
                <div className="package-content">
                  <div className="package-header">
                    <FaCalendarAlt className='package-icon' />
                    <div className="header-highlighter"></div>
                  </div>
                  <div className="package-text">
                    <h3>Accept Bookings</h3>
                    <p>After verifying their identity, drivers can book your car when it’s available.</p>
                  </div>
                </div>
            
                {/* Step 3 */}
                <div className="package-content">
                  <div className="package-header">
                    <FaKey className='package-icon' />
                    <div className="header-highlighter"></div>
                  </div>
                  <div className="package-text">
                    <h3>Remote Access</h3>
                    <p>Drivers can find your car, and unlock or lock it with their phone after completing an exterior walkaround.</p>
                  </div>
                </div>
            
                {/* Step 4 */}
                <div className="package-content">
                  <div className="package-header">
                    <FaDollarSign className='package-icon' />
                    <div className="header-highlighter"></div>
                  </div>
                  <div className="package-text">
                    <h3>Get paid</h3>
                    <p>Enjoy quick and hassle-free payments directly to you including compensation for any additional fuel or mileage.</p>
                  </div>
                </div>
            
              </div>
            </div>
            )}

            {/* FLiiTS Standard */}
            {activePackage === 'standard' && (
              <div className="works-content active" id="fliits-standard">
                <div className="package-container">
                  {/* Step 1 */}
                  <div className="package-content">
                    <div className="package-header">
                      <FaCar className='package-icon' />
                      <div className="header-highlighter"></div>
                    </div>
                    <div className="package-text">
                      <h3>List your car</h3>
                      <p>Provide your car’s essential details so you can start renting.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="package-content">
                    <div className="package-header">
                    <FaCalendarAlt className='package-icon' />
                      <div className="header-highlighter"></div>
                    </div>
                    <div className="package-text">
                      <h3>Accept Bookings</h3>
                      <p>Accept booking requests, confirm the check-in time, date, and place with the driver.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="package-content">
                    <div className="package-header">
                     <FaHandshake className='package-icon' />
                      <div className="header-highlighter"></div>
                    </div>
                    <div className="package-text">
                      <h3>Rent your car</h3>
                      <p>Inspect the car and finish the rental agreement with the driver.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="package-content">
                    <div className="package-header">
                      <FaDollarSign className='package-icon' />
                      <div className="header-highlighter"></div>
                    </div>
                    <div className="package-text">
                      <h3>Get paid</h3>
                      <p>Enjoy quick and hassle-free payments directly to you including compensation for any additional fuel or mileage.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Link to= '/'className="learn-more-link">
          <p>Learn more about FL<span style={{ color: "gold" }}>ii</span>TS Packages</p>
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
