import { useState } from "react";
const Search = (props) => {
  const [city, setCity] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    props.onFormSubmit(city);
    setCity("");
  };
  return (
    <form className="Search" onSubmit={handleOnSubmit}>
      <input
        type="search"
        placeholder="Enter a location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  );
};

export default Search;
