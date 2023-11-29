import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
  const [chosenLocation, setChosenLocation] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = localStorage.getItem('chosen location');
    setChosenLocation(storedLocation);
  }, []);

  const handleYesClick = () => {
    setShowButtons(false);
  };

  const handleNoClick = () => {
    const newRecommendationsMessage = "Sorry about that! Here are three new recommendations for you:";
    localStorage.setItem("newRecommendationsMessage", newRecommendationsMessage);
    navigate('/recommendations');
  };

  const handleLeaveNowClick = () => {
    window.alert("Thank you for using CMU spaces! Your feedback has been recorded.");
    window.location.href = "/";
  };

  return (
    <div>
      <h2 className="title">Chosen Location:</h2>
      <h1 className="centered-subtitle" id="chosenLocationDisplay">
        {chosenLocation}
      </h1>
      {showButtons ? (
        <div>
          <p id="feedbackRequest">Were our recommendations correct?</p>
          <div className="feedback-buttons">
            <button id="YesBtn" onClick={handleYesClick}>
              Yes
            </button>
            <button id="NoBtn" onClick={handleNoClick}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div id="thankYou">
          <p id="thankYouMessage">Thank you for using CMU Seats! Help us improve our recommendations by indicating when you leave:</p>
          <button id="LeaveNowBtn" onClick={handleLeaveNowClick}>
            I'm leaving now!
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
