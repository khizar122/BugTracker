import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignupAction } from "../redux/actions/actions";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [login] = useState(JSON.stringify(localStorage.getItem("login")));
  console.log("login", login);
  const dispatch = useDispatch();
  const users = [
    { value: "Manager", label: "Manager" },
    { value: "Developer", label: "Developer" },
  ];
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handlesubmit = () => {
    if (name !== "" && email !== "" && password !== "" && userType !== "") {
      if (validateEmail(email)) {
        if (password.length > 7) {
          dispatch(SignupAction({ name, email, password, userType }));
          alert("Data submitted . . . ");
        } else {
          alert("Password Length is Less than 8");
        }
      } else {
        alert("Validate your email ");
      }
    } else {
      alert("Fill All TextFileds . . .");
    }
  };
  const handleusertype = (userType) => {
    setUserType(userType.value);
  };
  return (
    <>
      <section
        className="vh-100"
        style={{ backgroundImage: "linear-gradient(#396afc, #2948ff)" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Select
                              isClearable={false}
                              className="react-select"
                              classNamePrefix="select"
                              options={users}
                              onChange={handleusertype}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handlesubmit}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                      <div>
                        Already have Account?
                        <Link to={"/login"}>
                          <p>Login</p>
                        </Link>{" "}
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
