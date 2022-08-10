import { ActionTypes } from "../constants/actions-types";
const initialState = {
  Login: [],
  isLogin: false,
  message: "",
};

export const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        Login: payload,
        isLogin: true,
        message: "Login Sucessfully",
      };
    default:
      return state;
  }
};
export const LogoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGOUT:
      return {
        ...state,
        Login: payload,
        isLogin: false,
        message: "Logged out",
      };
      default:
        return state;
      
  }
  
};
export const SignupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGNUP:
      const data = [
        {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          usertype: payload.userType,
          isLogged: false,
        },
      ];
      const databefore = JSON.parse(localStorage.getItem("login"));
      if (databefore != null) {
        const result = databefore.concat(data);
        localStorage.setItem("login", JSON.stringify(result));
      } else {
        localStorage.setItem("login", JSON.stringify(data));
      }
      return {
        ...state,
        Login: payload,
      };
    default:
      return state;
  }
};
