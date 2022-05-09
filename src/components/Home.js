import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DailyWeather from "./DailyWeather";
import Weather from "./Weather";
import { Spinner } from "reactstrap";
import useAutoComplete from "./autocomplete/use-auto-complete";
import AutoComplete from "./autocomplete/AutoComplete";
import { FiSearch } from "react-icons/fi";

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [dailyForecast, setDailyForecast] = useState([] || null);
  const [options, setOptions] = useState([] || null);
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [pressure, setPressure] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const { results, handleChange, handleSearch, handleSelect, selected } =
    // autocomplete triggered for every user input
    useAutoComplete({
      onSearch: async (q) => {
        setIsLoading(true);
        const placesResult = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${API_KEY}`
        );
        const placesJson = await placesResult.json();
        setIsLoading(false);
        return placesJson;
      },
      onChange: () => {},
      onError: (e) => {
        setError(
          e?.response?.data?.error ?? "Could not search, please try again"
        );
      },
    });

  // fetch  daily weather data api
  useEffect(() => {
    if (!selected) return;
    const fetchDailyForecast = async () => {
      setDataLoading(true);
      const results = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${selected.lat}&lon=${selected.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`
      );
      if (!results.ok) {
        throw Error(
          "Oops! We could not fetch data for the location. Please try again..."
        );
      }
      setDataLoading(false);
      const dailyWeatherForecast = await results.json();
      const { current, daily } = dailyWeatherForecast;
      if (dailyForecast.length > 0) setDailyForecast(() => []);
      setDailyForecast((prevState) => {
        return [...prevState, ...daily];
      });

      setError(null);
      setCountry(selected.country);
      setHumidity(current.humidity);
      setWind(current.wind_speed);
      setTemperature(current.temp);
      setPressure(current.pressure);
      setWeatherDesc(current.weather[0].description);
      setLocation(selected.name);
      setIcon(current.weather[0].icon);

      setDate(
        new Date(current.dt * 1000).toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      console.log(current);
      console.log(daily);
    };

    fetchDailyForecast().catch((error) => {
      // check for error
      setError(error.message);
      setIsLoading(false);
    });
  }, [selected]);

  console.log(
    country,
    temperature,
    wind,
    humidity,
    weatherDesc,
    location,
    options
  );

  const [a, ...daysToshow] = dailyForecast;
  const days = daysToshow;

  return (
    <div className="mx-auto w-[90%] py-8 md:mx-auto md:max-w-lg">
      <h1 className="text-[#64CCFC] text-2xl font-bold text-center">
        Weather App
      </h1>

      <AutoComplete
        bordered
        onSearch={handleSearch}
        loading={isLoading}
        label="Which city are you curious about?"
        placeholder="Search.."
        rightIcon={<FiSearch />}
        disabled={dataLoading}
        results={results.map((r) => ({
          id: r.lat,
          display: `${r.name}, ${r.state}, ${r.country}`,
        }))}
        onSelect={handleSelect}
        selected={
          selected
            ? `${selected.name}, ${selected.state}, ${selected.country}`
            : null
        }
        onChange={handleChange}
      />

      {error && (
        <p className="text-[#8C0C0C] text-xl m-4 text-center">{error}</p>
      )}
      {dataLoading ? (
        <div className="flex justify-between  space-x-4">
          <p className="text-white text-center text-3xl">Loading</p>
          <Spinner color="light">Loading...</Spinner>
        </div>
      ) : (
        <Weather
          location={location}
          country={country}
          temperature={temperature}
          pressure={pressure}
          wind={wind}
          humidity={humidity}
          description={weatherDesc.toUpperCase()}
          icon={icon}
          date={date}
        />
      )}
      <div className="my-10 space-y-2  rounded">
        {days.map((day, index) => (
          <DailyWeather key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Home;
