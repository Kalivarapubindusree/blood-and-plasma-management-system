import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setSearchFilterValue }) {
  return (
    <div className="w-full lg:15">
      <div className="flex justify-center items-center text-white border-b-2 border-b-white pb-2">
        <ul className="flex justify-between items-center space-x-6">
          <Link to="/">
            <li className="nav-list-item-style">Home</li>
          </Link>
          {/* <Link to="/bloodbank">
            <li
              className="nav-list-item-style"
              onClick={() => {
                setSearchFilterValue("");
              }}
            >
              Blood Bank
            </li>
          </Link> */}
          {/* <Link to="/plasmabank">
            <li
              className="nav-list-item-style"
              onClick={() => {
                setSearchFilterValue("");
              }}
            >
              Plasma Bank
            </li>
          </Link> */}
          <Link to="/event">
            <li
              className="nav-list-item-style"
              onClick={() => {
                setSearchFilterValue("");
              }}
            >
              Events
            </li>
          </Link>
          <Link to="/videos">
            <li className="nav-list-item-style">Videos</li>
          </Link>
          <Link to="/contact-us">
            <li className="px-8 font-medium  cursor-pointer">Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
