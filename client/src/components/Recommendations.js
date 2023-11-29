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
  const [recommendationsMessage, setRecommendationsMessage] = useState("");

  useEffect(() => {
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

    // Retrieve sorry message if it exists, and then remove it
    const storedMessage = localStorage.getItem("newRecommendationsMessage");
    if (storedMessage) {
      setRecommendationsMessage(storedMessage);
      localStorage.removeItem("newRecommendationsMessage");
    }
  }, []); 

  const handleLocationClick = (chosenLocation) => {
    localStorage.setItem("chosen location", chosenLocation);
    navigate('/feedback');
  };

  return (
    <div>
      {recommendationsMessage ? null : <h1 className="title">Recommendations:</h1>}
      {recommendationsMessage && (
        <p id="recommendationsMessage">{recommendationsMessage}</p>
      )}
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
