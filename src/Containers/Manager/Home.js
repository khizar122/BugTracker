import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";
import { useSelector } from "react-redux";
import ToastContainer, { toast } from "react-light-toast";
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
  const [developerData] = useState(JSON.parse(localStorage.getItem("login")));
  // setDeveloperData(developerData.filter((d) => d.usertype === "Developer"));
  let developername = developerData.filter((d) => d.usertype === "Developer");

  const prioritydata = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];
  const selectOptions = projdata;
  const handleChange = (selection) => {
    setPriority(selection.value);
  };

  const handleProject = (selected) => {
    setProject(selected.id);
    console.log("Project ID", project);
  };
  const dataemail = useSelector((state) => state.LoginData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      des !== "" &&
      priority !== "" &&
      project !== "" &&
      assign !== "" &&
      title !== ""
    ) {
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
          created_by: dataemail.Login.email,
        },
      ];

      const existingData = JSON.parse(localStorage.getItem("data"));

      if (existingData != null) {
        const result = existingData.concat(data);
        localStorage.setItem("data", JSON.stringify(result));
        toast.success("Bug Added to Project Sucessfully");
      } else {
        localStorage.setItem("data", JSON.stringify(data));
        toast.success("Bug Added to Project Sucessfully");
      }
    } else {
      toast.error("Error Some of textFields are Empty...");
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
                  isClearable={true}
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

                <Select
                  name="accounts"
                  options={developername}
                  onChange={(item) => {
                    console.log(item.name);
                    setAssign(item.email);
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.Id}
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
        <ToastContainer
          options={{
            position: "bottom-right",
          }}
        />
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default Home;
