import { useState, useEffect } from "react";
import axios from "axios";

let Display = ({ list, country, click, value }) => {
  if (list.length > 10 && country !== "") {
    return <div>Too many matches, specify another filter</div>;
  } else if (list.length > 1 && country !== "") {
    return list.map((item, index) => (
      <div key={item.altSpellings[0]}>
        {item.name.official}
        <Button click={click} value={index} />
        {value[index] ? <CompleteInfo list={item} /> : ""}
      </div>
    ));
  } else if (list.length === 1 && country !== "") {
    return <CompleteInfo list={list[0]} />;
  }
};

let CompleteInfo = ({ list }) => {
  let [forecast, setForecast] = useState({
    coord: {
      lon: -122.08,
      lat: 37.39,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 282.55,
      feels_like: 281.86,
      temp_min: 280.37,
      temp_max: 284.26,
      pressure: 1023,
      humidity: 100,
    },
    visibility: 10000,
    wind: {
      speed: 1.5,
      deg: 350,
    },
    clouds: {
      all: 1,
    },
    dt: 1560350645,
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: "US",
      sunrise: 1560343627,
      sunset: 1560396563,
    },
    timezone: -25200,
    id: 420006353,
    name: "Mountain View",
    cod: 200,
  });

  useEffect(() => {
    let api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${list.latlng[0]}&lon=${list.latlng[1]}&appid=${api_key}&units=metric`
      )
      .then(response => setForecast(response.data));
  }, [list]);

  return <div>
    <h2>{list.name.official}</h2>
    <p>capital: {list.capital[0]}</p>
    <p>area: {list.area}</p>
    <h2>languages: </h2>
    <ul>
      {Object.keys(list.languages).map((item) => (
        <li key={item}>{list.languages[item]}</li>
      ))}
    </ul>
    <img src={list.flags.png} alt="Flag of the country" />
    <h2>Weather in {list.name.official}</h2>
    <p>temperature: {forecast.main.temp} Celsius</p>
    <img
      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
      alt="Current weather"
    />
    <p>wind: {forecast.wind.speed} m/s</p>
  </div>;
};

let Button = ({ click, value }) => (
  <button onClick={click} value={value}>
    show
  </button>
);

function App() {
  let [country, setCountry] = useState("");
  let [countries, setCountries] = useState([]);
  let [selected, setSelected] = useState([]);
  let [show, setShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  let handleCountry = (event) => {
    let value = event.target.value;
    let arr = countries.filter((item) =>
      item.name.official.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setCountry(value);
    setSelected(arr);
    setShow(arr.map((item) => false));
  };

  let buttonHandler = (event) => {
    setShow(
      selected.map((item, index) =>
        parseInt(event.target.value) === index ? true : false
      )
    );
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={handleCountry} />
      </div>
      <br />
      <Display
        list={selected}
        country={country}
        click={buttonHandler}
        value={show}
      />
    </div>
  );
}

export default App;
