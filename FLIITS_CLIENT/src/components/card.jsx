import React from 'react';
import '../styles/Card.css';

const Card = ({ title, value, unit, color }) => {
  return (
    <div className={`stat-card ${color ? 'border-' + color : ''}`}>
      <h3>{title}</h3>
      <div className="stat-value">
        <span>{value}</span>
        <small>{unit}</small>
      </div>
    </div>
  );
};

export default Card;