import icon_day from "./img/day.svg";
import icon_night from "./img/night.svg";

const Weather = (props) => {
  const { IsDayTime, WeatherText, Temperature } = props.city;
  const icon_time = IsDayTime ? icon_day : icon_night;

  return (
    <div className="Weather">
      <div className="Weather-row">
        <img src={icon_time} alt="weather-icon" />
        <h1>{Temperature && Temperature.Metric.Value}°C</h1>
      </div>
      <div className="Weather-row">
        <p>{WeatherText}</p>
      </div>
    </div>
  );
};

export default Weather;
