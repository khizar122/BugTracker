import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/actions/actions";
import { useSelector } from "react-redux";
const NavBar = () => {
  const dispatch = useDispatch();
  const data_redux = useSelector((state) => state.LoginData);
 
  const [data_local] = useState(
    JSON.parse(localStorage.getItem("login"))
  );
  const editdata = () => {
    data_local.map((val, index) => {
      if (
        data_redux.Login.email === val.email &&
        data_redux.Login.password === val.password
      ) {
        data_local[index].isLogged = false;
        localStorage.setItem("login", JSON.stringify(data_local));
      }
      return "";
    });
  };
  const logout = () => {
    const data = [];
    dispatch(Logout(data));
    editdata();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          
            Bugs Tracker
         

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add-bug"} className="nav-link ">
                  Add Bug
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link ">
                  Create Project
                </Link>
              </li>
              <li className="nav-item" onClick={logout}>
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

export default NavBar;
