import { FaEdit, FaPlus } from 'react-icons/fa';
import '../styles/VehicleTable.css';

const VehicleTable = ({ vehicles, onAddCar, onEditCar }) => {
  return (
    <div className="vehicles-section">
      <h2 className="section-title">My Cars</h2>
      
      <div className="table-container">
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>Car Model</th>
              <th>Year</th>
              <th>Type</th>
              <th>Plate Number</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.plate}</td>
                <td>{vehicle.price}</td>
                <td className={`status-badge ${vehicle.status.toLowerCase().replace(' ', '-')}`}>
                  {vehicle.status}
                </td>
                <td>
                  <button 
                    className="edit-btn" 
                    onClick={() => onEditCar(vehicle.id)}
                  >
                    <FaEdit /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-car-btn-container">
        <button className="add-car-btn" onClick={onAddCar}>
          <FaPlus /> Add New Car
        </button>
      </div>
    </div>
  );
};
export default VehicleTable;