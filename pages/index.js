import React, { useReducer, useEffect } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        hotels: action.payload,
        filteredHotels: action.payload,
      };

    case "FILTER":
      const filteredHotels = state.hotels.filter((hotel) =>
        hotel.city.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filteredHotels };

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cityFilter, setCityFilter] = React.useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  const handleFilterChange = (event) => {
    setCityFilter(event.target.value);
    dispatch({ type: "FILTER", payload: event.target.value });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        value={cityFilter}
        onChange={handleFilterChange}
      />

      <ul>
        {state.filteredHotels.map((hotel) => (
          <li key={hotel.hotel_name}>{hotel.hotel_name}</li>
        ))}
      </ul>
    </div>
  );
}
