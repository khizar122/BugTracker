import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import DeveloperNavBar from "./DeveloperNavBar";
import { useParams } from "react-router-dom";
const Bugs = () => {
  const { id } = useParams();
  console.log(id)
  const loginData = useSelector((state) => state.LoginData);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [login_local_db] = useState(JSON.parse(localStorage.getItem("login")));
  const handleDelete = (id) => {
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
                console.log("IDS",typeof(id))
                if(parseInt(id)===parseInt(value.project)){
              
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
                        onClick={() => handleDelete(value.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
           
              };
             
              }
              return '' 
              // else {
              //   return (
              //     <tr key={index}>
              //       <td>{value.id}</td>
              //       <td>{value.title}</td>
              //       <td>{value.priority}</td>
              //       <td>{value.assigned}</td>
              //       <td>{value.Description}</td>
              //       <td>{value.project}</td>
              //       <td>{value.created_by}</td>
              //       <td
              //         style={{
              //           color: getColor(value.status),
              //           fontWeight: "bold",
              //         }}
              //       >
              //         {value.status}
              //       </td>
              //       <td>
              //         <Link to={`/edit/${value.id}`}>
              //           <button
              //             className="btn btn-outline-primary"
              //             onClick={() => handleEdit(value.id)}
              //           >
              //             Edit
              //           </button>
              //         </Link>{" "}
              //         <button
              //           className="btn btn-outline-danger"
              //           onClick={() => handleDelete(value.id)}
              //         >
              //           Delete
              //         </button>
              //       </td>
              //     </tr>
              //   );
              // }
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
