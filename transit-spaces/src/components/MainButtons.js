import React from 'react';
import { Link } from 'react-router-dom';

function MainButtons() {
  return (
    <section className="main-buttons">
      <button id="realTimeBtn">View Traffic in Real Time</button>
      <Link to="/preferences">
        <button id="recommendBtn">Recommend a Space</button>
      </Link>
    </section>
  );
}

export default MainButtons;