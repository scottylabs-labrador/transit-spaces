import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feedback() {
  const [chosenSeat, setChosenSeat] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChosenSeat = JSON.parse(localStorage.getItem("chosenSeat"));
    if (!storedChosenSeat) navigate("/");
    setChosenSeat(storedChosenSeat);
  }, [navigate]);

  const handleYesClick = () => {
    setShowButtons(false);
  };

  const handleNoClick = () => {
    const newRecommendationsMessage =
      "Sorry about that! Here is a new recommendations for you:";
    setIsLoading(true);

    const selectedBuilding = localStorage.getItem("selectedBuilding");
    const selectedFloor = parseInt(localStorage.getItem("selectedFloor"));
    const selectedCapacity = parseInt(localStorage.getItem("selectedCapacity"));
    const selectedTimeRequirement = parseInt(
      localStorage.getItem("selectedTimeRequirement")
    );

    axios({
      url: "https://cmu-seats.onrender.com/updateAvailability",
      method: "PUT",
      data: {
        seatId: chosenSeat.id,
        wasAvailable: false,
      },
    })
      .then(() => {
        axios({
          url: "https://cmu-seats.onrender.com/getRecommendation",
          method: "POST",
          data: {
            buildingId: selectedBuilding,
            floor: selectedFloor,
            capacity: selectedCapacity,
            timeRequirement: selectedTimeRequirement,
          },
        })
          .then((res) => {
            localStorage.setItem(
              "recommendedSeats",
              JSON.stringify([res.data])
            );
            localStorage.setItem(
              "newRecommendationsMessage",
              newRecommendationsMessage
            );
            navigate("/recommendations");
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLeaveNowClick = () => {
    window.alert(
      "Thank you for using CMU spaces! Your feedback has been recorded."
    );
    window.location.href = "/";
  };

  return (
    <div>
      <h2 className="title">Chosen Location:</h2>
      <h1 className="centered-subtitle" id="chosenLocationDisplay">
        {chosenSeat.name}
        <br />
        <img
          src={chosenSeat.photo}
          alt={"Location"}
          height={"30%"}
          width={"30%"}
        />
      </h1>
      {showButtons ? (
        <div>
          <p id="feedbackRequest">Were our recommendations correct?</p>
          <div className="feedback-buttons">
            <button id="YesBtn" onClick={handleYesClick}>
              Yes
            </button>
            <button id="NoBtn" onClick={handleNoClick} disabled={isLoading}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div id="thankYou">
          <p id="thankYouMessage">
            Thank you for using CMU Seats! Help us improve our recommendations
            by indicating when you leave:
          </p>
          <button id="LeaveNowBtn" onClick={handleLeaveNowClick}>
            I'm leaving now!
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
