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
      <section className="header-text">
        <p>CMU Seats</p>
      </section>
    </header>
  );
}

export default Header;