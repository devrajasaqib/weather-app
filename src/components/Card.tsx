import React, { useMemo } from 'react';
import weatherIcon from "../assets/weather.png";
import clearSky from "../assets/clear-sky.png";
import Sky from "../assets/sun.svg";
import partlyClear from "../assets/partly-cloudy.png";
import slightrain from "../assets/slight-rain.png";
import heavyrain from "../assets/heavy-rain.png";
import { formatDate } from '../utils/utils';
import { Weather } from '../interfaces/weatherInterfaces';


const conditionIcons: { [key: string]: string } = {
  'Clear sky': Sky,
  'Mainly clear': clearSky,
  'Partly cloudy': partlyClear,
  'Slight rain': slightrain,
  'Heavy rain': heavyrain,
};

const Card: React.FC<{ weather: Weather }> = ({ weather }) => {
  const { date, condition, day_of_week, temperature, wind_speed } = weather;

  const formattedDate = useMemo(() => formatDate(date), [date]);
  const conditionIcon = conditionIcons[condition] || weatherIcon;

  return (
    <div className="card-list">
      <div className="date">
        <p>{day_of_week}, {formattedDate}</p>
      </div>
      <div className='img'>
        <img src={conditionIcon} alt="Weather condition icon" />
      </div>
      <div className="features">
        <div className="description" style={{ marginBottom: 20 }}>
          <p className='description-p'>
            {condition}
          </p>
        </div>
        <div className="description">
          <h1 className='temprature'>
            {temperature?.min}{"°C"} - {temperature?.max}{"°C"}
          </h1>
        </div>
        <div className="description">
          <h5>{"Wind Speed:"}</h5>
          <h6 style={{ margin: 0, fontSize: 12, color: "gray" }}>
            {wind_speed}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
