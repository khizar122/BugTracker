import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginAction } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // const data = useSelector((state) => state.LoginData);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logindata] = useState(JSON.parse(localStorage.getItem("login")));
  const dispatch = useDispatch();
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handlesubmit = () => {
    if (email !== "" && password !== "") {
      if (validateEmail(email)) {
        if (password.length > 7) {
          dispatch(LoginAction({ email, password }));
          logindata?.map((val, index) => {
            if (val.email === email && val.password === password) {
              if (val.usertype === "Manager") {
                logindata[index].isLogged = true;
                localStorage.setItem("login", JSON.stringify(logindata));
                return navigate("/home");
              }
              // else{
              //   logindata[index].isLogged = true;
              //   localStorage.setItem("login", JSON.stringify(logindata));
              //   return navigate("/bugs");
              // }
            } else {
              alert("Email or Password is wrong...");
            }
            return null;
          });
        } else {
          alert("Password is less then 8");
        }
      } else {
        alert("Email is not validate");
      }
    } else {
      alert("Form is Empty...");
    }
  };
  return (
    <>
      <section
        className="vh-100"
        style={{ backgroundImage: "linear-gradient(#396afc, #2948ff)" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-8">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-md"
                            onClick={handlesubmit}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <div>
                        Not have Account?
                        <p>
                          <Link to={"/register"}>Register</Link>
                        </p>
                      </div>
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

export default Login;
