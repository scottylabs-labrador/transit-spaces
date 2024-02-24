import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className="bg-gray-50 flex h-full flex-row items-center justify-between p-6">
      <div className="text-gray-800 flex flex-initial cursor-pointer flex-row justify-start font-semibold">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="scotty-labs-logo.png"
              className="rounded"
              width={30}
              height={30}
              alt="favicon"
            />
            <span className="ml-2">CMU Seats</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;