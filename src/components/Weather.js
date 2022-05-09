import { BiCurrentLocation } from "react-icons/bi";
import { TiWeatherWindy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { RiTimerLine } from "react-icons/ri";

const Weather = ({
  location,
  country,
  temperature,
  wind,
  humidity,
  description,
  icon,
  pressure,
  date,
}) => {
  const baseUrl = `http://openweathermap.org/img/w/${icon}`;

  return (
    <div className="flex flex-col items-center mt-5 space-y-2 gap-2">
      {location === "" ? null : (
        <div className="flex gap-x-8 items-center w-full justify-around">
          <h2 className="text-white text-2xl flex  items-center">
            <BiCurrentLocation color="#042C5C" size={20} className="mr-4" />
            {location}, {country}
          </h2>
          <p className="text-white text-lg items-center pt-2">{date}</p>
        </div>
      )}
      {icon === "" ? null : (
        <img
          src={`${baseUrl}.png`}
          alt="weather-icon"
          className="h-[140px] w-[140px] object-cover"
        />
      )}
      {description === "" ? null : (
        <p className="text-white rounded-full bg-[#042C5C] px-4 py-2 hover:bg-[#1B89FA] cursor-pointer">
          {description}
        </p>
      )}
      {temperature === "" ? null : (
        <p className="text-white text-3xl font-bold">{temperature} &#x2103;</p>
      )}

      <div className="flex items-center space-x-8">
        {pressure === "" ? null : (
          <span className="text-white flex items-center gap-3 text-l lg:text-2xl">
            <RiTimerLine color="#042C5C" size={22} /> {pressure}
          </span>
        )}
        {humidity === "" ? null : (
          <span className="text-white flex items-center gap-3 text-l lg:text-2xl">
            <WiHumidity color="#042C5C" size={25} /> {humidity}
          </span>
        )}
        {wind === "" ? null : (
          <span className="text-white flex items-center gap-3 text-l lg:text-2xl">
            <TiWeatherWindy color="#042C5C" size={25} /> {wind} km/h
          </span>
        )}
      </div>
    </div>
  );
};

export default Weather;
