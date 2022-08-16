import React from "react";
import { Link } from "react-router-dom";
const DeveloperNavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          Bugs Tracker
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link active">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/login"} className="nav-link ">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DeveloperNavBar;
