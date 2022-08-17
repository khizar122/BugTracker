import React from "react";
import { useSelector } from "react-redux";
import DeveloperNavBar from "../Developer/DeveloperNavBar";
import { useState } from "react";
// import ToastContainer, { toast } from "react-light-toast";
import { Navigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
const UserBugs = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [bugId, setBugId] = useState(-1);
  const [open, setOpen] = useState(false);
  const getColor = (status) => {
    if (status === "Completed") return "#1DBB52";
    if (status === "pending") return "#EAE725";
    return "";
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (bugId) => {
    setBugId(bugId);
    setOpen(true);
  };
  const handleEdit = (event) => {
    event.preventDefault();
    const bugsData = [...data];

    const index = bugsData?.findIndex((object) => {
      return parseInt(object.id) === parseInt(bugId);
    });

    if (index !== -1) {
      if (bugsData[index].status === "Completed") {
        bugsData[index].status = "pending";
      } else {
        bugsData[index].status = "Completed";
      }
    }
    localStorage.setItem("data", JSON.stringify(bugsData));
    setData(bugsData);
    handleClose();
  };

  const loginData = useSelector((state) => state.LoginData);
  if (loginData.isLogin === true) {
    return (
      <div>
        <DeveloperNavBar></DeveloperNavBar>
        <center>
          <h2 style={{ padding: "10px" }}>Bugs Created By Manager</h2>
        </center>

        <div className="col-auto">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Assigned to</th>
                  <th scope="col">Description</th>
                  <th scope="col">Project ID</th>
                  <th scope="col">Manager Contact</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((value, index) => {
                  if (value.assigned === loginData.Login.email) {
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
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleClickOpen(value.id)}
                          >
                            {value.status === "Completed"
                              ? "Mark as Pending"
                              : "Mark as Completed"}
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
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Solved ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure to Perform this Operation ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleEdit} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};

export default UserBugs;
