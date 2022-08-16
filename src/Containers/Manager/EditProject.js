import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import NavBar from "./NavBar";
import { Navigate } from "react-router-dom";
import ToastContainer, { toast } from "react-light-toast";
const EditProject = () => {
  const dataLogin = useSelector((state) => state.LoginData);
  const [data] = useState(JSON.parse(localStorage.getItem("project")));
  const { projId } = useParams();

  const index = data.findIndex((object) => {
    return parseInt(object.id) === parseInt(projId);
  });

  const [title, setTitle] = useState(data[index].label);
  const [desc, setDesc] = useState(data[index].value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (index !== -1) {
      data[index].label = title;
      data[index].value = desc;
      localStorage.setItem("project", JSON.stringify(data));
      toast.success("Sucessfully Updated...",{        autoClose: true,   });
    }
  };
  if (dataLogin.isLogin === true) {
    return (
      <div>
        <NavBar></NavBar>
        <div className="jumbotron">
          <center>
            <h4>Edit Project</h4>
          </center>
          <form id="issueInputForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="issueAssignInput">
                Title<span className="text-danger">*</span>
              </label>
              <input
                id="issueAssignInput"
                className="form-control"
                type="text"
                value={title}
                placeholder="Project Name"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueAssignInput">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                id="issueAssignInput"
                className="form-control"
                type="text"
                value={desc}
                placeholder="Project Name"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <center>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </center>
          </form>
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

export default EditProject;
