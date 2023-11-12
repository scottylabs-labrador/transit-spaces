import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const navigate = useNavigate();
  const initialLocations = {
    location1: "",
    location2: "",
    location3: "",
  };

  const [state, setState] = useState(initialLocations);

  useEffect(() => {
    // we retrieve "["location1", "location2", "location3"]" as a string
    // we convert it to an array, then remove all quotes for each element
    const locationsStr = localStorage.getItem("locations");
    const locationsArray = JSON.parse(locationsStr);
    const removeQuotes = locationsArray.map((element) => element.replace(/"/g, ''));
    const location1 = removeQuotes[0];
    const location2 = removeQuotes[1];
    const location3 = removeQuotes[2];

    setState({
      location1,
      location2,
      location3,
    });
  }, []); 

  const handleLocationClick = (chosenLocation) => {
    console.log("Chosen recommended location: " + chosenLocation);
    localStorage.setItem("chosen location", chosenLocation);
    navigate('/feedback');
  };

  return (
    <div>
        <h1 className="title">Recommendations:</h1>
        <ol id="location-list">
          <li className="list">
            <button
              id="location1"
              className="locations"
              onClick={() => handleLocationClick(state.location1)}
            >
              {state.location1}
            </button>
          </li>
          <li className="list">
            <button
              id="location2"
              className="locations"
              onClick={() => handleLocationClick(state.location2)}
            >
              {state.location2}
            </button>
          </li>
          <li className="list">
            <button
              id="location3"
              className="locations"
              onClick={() => handleLocationClick(state.location3)}
            >
              {state.location3}
            </button>
          </li>
        </ol>
    </div>
  );
}

export default Recommendations;
