import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import DeveloperNavBar from "./DeveloperNavBar";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
const Bugs = () => {
  const { id } = useParams();
  console.log(id);
  const loginData = useSelector((state) => state.LoginData);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [login_local_db] = useState(JSON.parse(localStorage.getItem("login")));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    console.log("dialog", id);
    const db = data.filter((data) => data.id !== id);
    localStorage.setItem("data", JSON.stringify(db));
    setData(JSON.parse(localStorage.getItem("data")));
  };

  const getColor = (status) => {
    if (status === "Completed") return "#1DBB52";
    if (status === "pending") return "#EAE725";
    return "";
  };

  const handleEdit = (id) => {};
  if (loginData.isLogin === true) {
    return (
      <div>
        {login_local_db?.map((val, index) => {
          if (
            val.email === loginData.Login.email &&
            val.password === loginData.Login.password &&
            val.usertype === "Developer"
          ) {
            return <DeveloperNavBar></DeveloperNavBar>;
          } else if (
            val.email === loginData.Login.email &&
            val.password === loginData.Login.password &&
            val.usertype === "Manager"
          ) {
            return <NavBar></NavBar>;
          }
          return null;
        })}

        <center>
          <h2 style={{ padding: "10px" }}> All Bugs Reported</h2>
        </center>
        <div className="col-auto">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Priority</th>
                <th scope="col">Assigned to</th>
                <th scope="col">Description</th>
                <th scope="col">Project Id #</th>
                <th scope="col">Created by</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((value, index) => {
                if (loginData.Login.email === value.created_by) {
                  console.log("IDS", typeof id);
                  if (parseInt(id) === parseInt(value.project)) {
                    return (
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.title}</td>
                        <td>{value.priority}</td>
                        <td>{value.assigned}</td>
                        <td>{value.Description}</td>
                        <td>{value.project}</td>
                        <td>{value.created_by}</td>
                        <td
                          style={{
                            color: getColor(value.status),
                            fontWeight: "bold",
                          }}
                        >
                          {value.status}
                        </td>
                        <td>
                          <Link to={`/edit/${value.id}`}>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEdit(value.id)}
                            >
                              Edit
                            </button>
                          </Link>{" "}
                          <button
                            className="btn btn-outline-danger"
                            onClick={handleClickOpen}
                          >
                            Delete
                          </button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete ?"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure to delete the bug.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button
                                onClick={() => handleDelete(value.id)}
                                autoFocus
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </td>
                      </tr>
                    );
                  }
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
export default Bugs;
