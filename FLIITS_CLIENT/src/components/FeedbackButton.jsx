import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Feedbackbutton.css';

const ShareButton = () => {
  return (
    <div className="FeedBack-container">
        <Link to="/FeedBackForm" className="Feedbackbutton">FeedBack</Link>
      </div>
  )
}

export default ShareButton