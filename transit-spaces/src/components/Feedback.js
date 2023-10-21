import React, { useEffect, useState } from 'react';

function Feedback() {
  const [chosenLocation, setChosenLocation] = useState('');

  useEffect(() => {
    const storedLocation = localStorage.getItem('chosen location');
    setChosenLocation(storedLocation);
  }, []);

  return (
    <div>
      <h2 className="title">
        Chosen Location:
      </h2>
      <h1 className="centered-subtitle" id="chosenLocationDisplay">
        {chosenLocation}
      </h1>
      <p id="feedbackRequest">
        Were our recommendations correct?
      </p>
      <div className="feedback-buttons">
        <button id="YesBtn">Yes</button>
        <button id="NoBtn">No</button>
      </div>
    </div>
  );
}

export default Feedback;
