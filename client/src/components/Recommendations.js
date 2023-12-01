import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recommendations() {
  // Leaving this here in case we want to recommend more than one option in the future
  const navigate = useNavigate();

  const [recommendedSeats, setRecommendedSeats] = useState([]);
  const [recommendationsMessage, setRecommendationsMessage] = useState("");

  useEffect(() => {
    const storedRecommendedSeats = JSON.parse(
      localStorage.getItem("recommendedSeats")
    );
    if (!storedRecommendedSeats) navigate("/");
    setRecommendedSeats(storedRecommendedSeats);

    // Retrieve sorry message if it exists, and then remove it
    const storedMessage = localStorage.getItem("newRecommendationsMessage");
    if (storedMessage) {
      setRecommendationsMessage(storedMessage);
      localStorage.removeItem("newRecommendationsMessage");
    }
  }, [navigate]);

  const handleSeatClick = (chosenSeat) => {
    localStorage.setItem("chosenSeat", JSON.stringify(chosenSeat));
    navigate("/feedback");
  };

  return (
    <div>
      {recommendationsMessage ? null : (
        <h1 className="title">Recommendations:</h1>
      )}
      {recommendationsMessage && (
        <p id="recommendationsMessage">{recommendationsMessage}</p>
      )}
      <ol id="seat-list">
        {recommendedSeats.map((seat, i) => {
          return (
            <li className="list" key={i}>
              <button className="seats" onClick={() => handleSeatClick(seat)}>
                {seat.name}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Recommendations;
