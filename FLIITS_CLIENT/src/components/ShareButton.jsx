import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShareButton.css';

const ShareButton = () => {
 

  return (
    <div className="header-button">
      <Link to='/Carshare' className="share-car-button-header">
        Share Your Car
      </Link>
    </div>
  );
}

export default ShareButton;
