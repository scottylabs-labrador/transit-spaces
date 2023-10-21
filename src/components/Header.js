import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>
      <div className="logo">
      <Link to="/">
          <img src="scotty-labs-logo.png" alt="Scotty Labs Logo" />
      </Link>
      </div>
      <section className="header-buttons">
        <button id="aboutBtn">About</button>
        <button id="teamBtn">Team</button>
      </section>
    </header>
  );
}

export default Header;