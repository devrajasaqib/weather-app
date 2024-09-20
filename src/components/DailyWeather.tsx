import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from './Card';


const DailyWeather: React.FC<any> = ({ weather }) => {

  return (
    <div style={{ width: '100%' }}>
      <div className='cards-container'>
        {weather.map((data: any, index: any) => (
          <div key={index}>
            <Card weather={data} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default DailyWeather;
