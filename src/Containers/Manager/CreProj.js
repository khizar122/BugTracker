import React, { useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ToastContainer, { toast } from 'react-light-toast';
const CreProj = () => {
  const data_redux = useSelector((state) => state.LoginData);
  const [proj, setProj] = useState("");
  const [Description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (proj !== "" && Description !== "") {
      const min = 1;
      const max = 1000;
      const rand = min + Math.random() * (max - min);
      const data = [
        {
          id: Math.round(rand),
          label: proj,
          value: Description,
          created_by: data_redux.Login.email,
        },
      ];
      const existingData = JSON.parse(localStorage.getItem("project"));

      if (existingData != null) {
        const result = existingData.concat(data);
        localStorage.setItem("project", JSON.stringify(result));
        toast.success('Project Created Successfully')
      } else {
        localStorage.setItem("project", JSON.stringify(data));
       toast.success('Project Created Successfully')
      }
    } else {
      toast.error('Empty Text Fields...');
    }
  };
  if (data_redux.isLogin === true) {
    return (
      <div>
        <NavBar></NavBar>
        <div className="jumbotron">
          <center>
            <h4>Create Project</h4>
          </center>
          <div className="jumbotro">
            <form id="issueInputForm">
              <div className="form-group">
                <label htmlFor="issueAssignInput">
                  Project Name <span className="text-danger">*</span>
                </label>
                <input
                  id="issueAssignInput"
                  className="form-control"
                  type="text"
                  placeholder="Project Name"
                  value={proj}
                  onChange={(e) => {
                    setProj(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issueDecInput">
                  Short Description About Project
                  <span className="text-danger">*</span>
                </label>
                <textarea
                  id="issueDecInput"
                  className="form-control"
                  type="text"
                  value={Description}
                  placeholder="Please Add Description ...."
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <center>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Create Project
                </button>
              </center>
            </form>
          </div>
        </div>
           
        <ToastContainer options={{ 
          reverse: true,
          position: 'bottom-center'
        }} /> 
  

   
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default CreProj;
