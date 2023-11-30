import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [recommendationsMessage, setRecommendationsMessage] = useState("");

  useEffect(() => {
    const locationsStr = localStorage.getItem("locations");
    const locationsArray = JSON.parse(locationsStr);
    setLocations(locationsArray);


    // Retrieve sorry message if it exists, and then remove it
    const storedMessage = localStorage.getItem("newRecommendationsMessage");
    if (storedMessage) {
      setRecommendationsMessage(storedMessage);
      localStorage.removeItem("newRecommendationsMessage");
    }
  }, []); 

  const handleLocationClick = (chosenLocation) => {
    localStorage.setItem("chosen location", JSON.stringify(chosenLocation));
    navigate('/feedback');
  };

  return (
    <div>
      {recommendationsMessage ? null : <h1 className="title">Recommendations:</h1>}
      {recommendationsMessage && (
        <p id="recommendationsMessage">{recommendationsMessage}</p>
      )}
      <ol id="location-list">
        {
          locations.map((location, i) => {
            return (<li className="list" key={i}>
              <button
                className="locations"
                onClick={() => handleLocationClick(location)}
              >
                {location.name}
              </button>
            </li>)
          })
        }
      </ol>
    </div>
  );
}

export default Recommendations;
