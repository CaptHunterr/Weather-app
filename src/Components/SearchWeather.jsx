import React, { useState, useEffect } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;

  useEffect(() => {
    // let componentMounted = true;
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=89defab4072303c565a9bf452b2443f1`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunder") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div className="container">
      <div className="box">
        <img
          src={`https://source.unsplash.com/350x550/?${data.weather[0].main}`}
          alt="backgound_image"
        />
        <div className="form-control">
          <form className="f_field" onSubmit={handleSubmit}>
            <input
              type="search"
              name="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search Country/city"
              required
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="info">
          <h3 id="location">{data.name}</h3>
          <p id="today">
            {day}, {month} {date}, {year}
          </p>
          <i id="cloud" className={`fas ${emoji} fa-4x`}></i>
          <h2 className="temp">{data.main.temp} &deg;C</h2>
          <p id="season">{data.main.weather}</p>
          <p id="min_max">
            Min : {data.main.temp_min} &deg;C | Max : {data.main.temp_max}{" "}
            &deg;C
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
