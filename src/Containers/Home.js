import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";
import { useSelector } from "react-redux";
const Home = () => {
  const data = useSelector((state) => state.LoginData);
  console.log("Login", data.Login.email);
  // const [isLogged] = useState(JSON.stringify(localStorage.getItem("login")));
  let [des, setDes] = useState("");
  const [priority, setPriority] = useState("");
  const [assign, setAssign] = useState("");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [projdata] = useState(JSON.parse(localStorage.getItem("project")));
  const prioritydata = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];
  const selectOptions = projdata;
  const handleChange = (selection) => {
    setPriority(selection.value);
  };

  const handleProject = (selectedOption) => {
    setProject(selectedOption.id);
  };
  const dataemail = useSelector((state) => state.LoginData);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const min = 1;
    const max = 300;
    const rand = min + Math.random() * (max - min);
    const data = [
      {
        id: Math.round(rand),
        Description: des,
        priority: priority,
        project: project,
        assigned: assign,
        status: "pending",
        title: title,
        created_by:dataemail.Login.email
      },
    ];

    const existingData = JSON.parse(localStorage.getItem("data"));

    if (existingData != null) {
      const result = existingData.concat(data);
      localStorage.setItem("data", JSON.stringify(result));
    } else {
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  if (data.isLogin === true) {
    return (
      <div>
        <NavBar></NavBar>
        <div className="jumbotron">
          <h4>Add New Issue Details</h4>
          <div className="jumbotro">
            <form id="issueInputForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="issueAssignInput">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="issueAssignInput"
                  className="form-control"
                  type="text"
                  placeholder="Short Summary Of Bug"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issueDecInput">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  id="issueDecInput"
                  className="form-control"
                  type="text"
                  placeholder="Please Add Description ..."
                  value={des}
                  onChange={(event) => {
                    setDes(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issuePriorityInput">
                  Select Project <span className="text-danger">*</span>
                </label>
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={selectOptions}
                  onChange={handleProject}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issuePriorityInput">
                  Priority <span className="text-danger">*</span>
                </label>
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={prioritydata}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issueAssignInput">
                  Assigned To <span className="text-danger">*</span>
                </label>
                <input
                  id="issueAssignInput"
                  className="form-control"
                  type="text"
                  placeholder="Assiged To ...."
                  value={assign}
                  onChange={(e) => {
                    setAssign(e.target.value);
                  }}
                />
              </div>
              <center>
                <button className="btn btn-primary" type="submit">
                  Create Bug
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default Home;
