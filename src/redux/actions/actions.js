
import { ActionTypes } from "../constants/actions-types";

export const LoginAction = (Login_data) => {
  return {
    type: ActionTypes.LOGIN,
    payload:Login_data ,
  };
};

export const SignupAction = (SignupData) => {
  return {
    type: ActionTypes.SIGNUP,
    payload: SignupData,
  };
};
export const Logout = (data)=>{
  return{
    type:ActionTypes.LOGOUT,
    payload:data
  }
}
