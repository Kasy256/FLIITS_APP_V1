import React from "react";
import { Link } from "react-router-dom";
import '../styles/BookStyle.css';
import Subaru from '../assets/images/subaru.jfif';
import Jeep  from '../assets/images/jeep.jfif';
import Benz  from '../assets/images/benz.jfif';
import BMW  from '../assets/images/bmw.jfif';
import Hilux  from '../assets/images/hilux.jpeg';



const CarSection = () => {

    const CarsData = [
        { name: 'Subaru', image: Subaru},
        { name: 'Jeep', image: Jeep},
        { name:  'Benz', image: Benz},
        { name: 'BMW', image: BMW},
        { name: 'Hilux', image: Hilux}
      ];

    return(
      <section className="cars">
      {CarsData.map((car, index) => (
        <div className="card-container" key={index}>
          <div className="cards">
            <Link to="/">
              <img src={car.image} alt={car.name} />
              <p className="label1">{car.name.charAt(0).toUpperCase() + car.name.slice(1)}</p>
            </Link>
          </div>
        </div>
      ))}
    </section> 
    );
}
export default CarSection;