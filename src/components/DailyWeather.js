const DailyWeather = ({ day, key }) => {
  const getDay = () => {
    const newDay = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(
      new Date(day.dt * 1000)
    );
    return newDay;
  };

  const getDate = () => {
    const date = new Date(day.dt * 1000);
    const currentDay = date.getDate();
    const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
      date
    );

    return currentDay + " " + month;
  };
  const baseUrl = `http://openweathermap.org/img/w/${day.weather[0].icon}`;
  return (
    <div className="flex justify-between items-center px-2 py-2" key={key}>
      <div>
        <h4 className="text-white text-xl">{getDay()}</h4>
        <p className="text-[#042C5C]">{getDate()}</p>
      </div>
      <p className="text-white">{day.temp.max} &#x2103;</p>
      <img src={`${baseUrl}.png`} alt="daily" />
    </div>
  );
};

export default DailyWeather;
