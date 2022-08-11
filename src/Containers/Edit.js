import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Edit = () => {
  const dataLogin = useSelector((state) => state.LoginData);
  const { bugId } = useParams();
  const [data] = useState(JSON.parse(localStorage.getItem("data")));
  const index = data.findIndex((object) => {
    console.log(" id",typeof(bugId))
    return (parseInt(object.id) === parseInt(bugId));
  });

  console.log("index",index)
  const [title, setTitle] = useState(data[index].title);
  const [desc, setDesc] = useState(data[index].Description);
  const [status, setStatus] = useState(data[index].status);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (index !== -1) {
      data[index].title = title;
      data[index].Description = desc;
      data[index].status = status;
      console.log(data);
    }
    localStorage.setItem("data", JSON.stringify(data));
  };
  const handleChange = (selection) => {
    setStatus(selection.value);
  };
  const statusData = [
    { value: "pending", label: "pending" },
    { value: "Completed", label: "Completed" },
  ];
  if (dataLogin.isLogin === true) {
    return (
      <div>
        <NavBar></NavBar>
        <div className="jumbotron">
          <center>
            <h4>Edit Details</h4>
          </center>
          <div className="jumbotro">
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
                  Status<span className="text-danger">*</span>
                </label>
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusData}
                  onChange={handleChange}
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
                  value={desc}
                  placeholder="Please Add Description ...."
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
        </div>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default Edit;
