import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavBar";

const Projects = () => {
  const [local_proj] = useState(JSON.parse(localStorage.getItem("project")));
  const loginData = useSelector((state) => state.LoginData);
  if (loginData.isLogin === true) {
    return (
      <div>
        <NavBar></NavBar>
        <center>
          <h2 style={{ padding: "10px" }}> All Projects </h2>
        </center>
        <div className="col-auto">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col"># Id</th>
                <th scope="col">Project Name</th>
                <th scope="col">Description</th>

                <th scope="col">Created by</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {local_proj?.map((value, index) => {
                if (loginData.Login.email === value.created_by) {
                  return (
                    <tr key={index}>
                      <td>{value.id}</td>
                      <Link to={`/details/${value.id}`}>
                        <td>{value.label}</td>
                      </Link>
                      <td>{value.value}</td>
                      <td>{value.created_by}</td>
                      <Link to={``}>
                        <button className="btn btn-outline-primary">
                          Edit
                        </button>
                        {"  "}
                      </Link>
                      <Link to={``}>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </Link>
                    </tr>
                  );
                }

                return "";
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default Projects;
