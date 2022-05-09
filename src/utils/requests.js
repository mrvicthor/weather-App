const API_KEY = process.env.REACT_APP_API_KEY;

console.log(API_KEY);

const requests = {
  fetchCityData: `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}`,
};

export default requests;
