import Banner from "./Banner";
import Search from "./Search";
import Weather from "./Weather";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function App() {
  const [city, setCity] = useState("");
  const [cityImg, setCityImg] = useState(
    "https://images.unsplash.com/photo-1545041552-becc2efcccc4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchCities = async (city) => {
    setIsLoading(true);
    const key = await axios(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=rjb9GGKqfaPtKGLM1rKeKAGmK79zP6lj&q=${city}`
    );
    if (key.data.length === 0) {
      setCity("not found");
    } else {
      const result = await axios(
        `http://dataservice.accuweather.com/currentconditions/v1/${key.data[0].Key}?apikey=rjb9GGKqfaPtKGLM1rKeKAGmK79zP6lj`
      );
      const cityImage = await axios(
        `https://api.unsplash.com/search/photos/?client_id=zVBF4QyvQrE427zoo9R_TDPcM4NdipIfCV13jdraANo&page=1&query=${city}&orientation=landscape`
      );

      setCity(result.data[0]);
      setCityImg(cityImage.data.results[0].urls.regular);
      setIsLoading(false);
    }
  };

  return city === "not found" ? (
    <h1>NOT FOUND</h1>
  ) : isLoading ? (
    <div className="App loading">
      <Search onFormSubmit={(q) => fetchCities(q)} />
      <Loader />
    </div>
  ) : (
    <div className="App">
      <Search onFormSubmit={(q) => fetchCities(q)} />
      <main className="main">
        <Banner url={cityImg} /> <Weather city={city} />
      </main>
    </div>
  );
}

export default App;
