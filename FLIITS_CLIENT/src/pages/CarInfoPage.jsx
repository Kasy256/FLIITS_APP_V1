import {useEffect} from 'react';
import BookingHeader from '../components/BookingHeader'
import CarInfo from '../components/CarInfo';
import CarInfoData from '../components/CarInfoData';
import '../styles/CarInfoPage.css'

function CarInfoPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const carinfodata = CarInfoData.map(items =>{

    return(
      <CarInfo 
      key={items.id}
      items={items}
      />
    )
  })

  return (
    <div className="car-info-page">
      <BookingHeader />
      {carinfodata}
    </div>
  );
}

export default CarInfoPage;
