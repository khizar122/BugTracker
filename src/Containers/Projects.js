import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Projects = () => {
  const [local_proj, setLocal_proj] = useState(
    JSON.parse(localStorage.getItem("project"))
  );
  const loginData = useSelector((state) => state.LoginData);
  const [open, setOpen] = useState(false);
  const [bugId, setBugId] = useState(-1);
  const handleClickOpen = (id) => {
    setBugId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    const db = local_proj.filter((data) => data.id !== bugId);
    localStorage.setItem("project", JSON.stringify(db));
    setLocal_proj(JSON.parse(localStorage.getItem("project")));
    handleClose();
  };
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
                      <td>
                        <Link to={`/edit-project/${value.id}`}>
                          <button className="btn btn-outline-primary">
                            Edit
                          </button>
                        </Link>
                        {"  "}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleClickOpen(value.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }

                return "";
              })}
            </tbody>
          </table>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Project ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this project.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default Projects;
