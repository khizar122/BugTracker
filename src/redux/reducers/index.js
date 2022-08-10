import { combineReducers } from "redux";
import { LoginReducer, SignupReducer } from "./reducer";
const reducers = combineReducers({
  LoginData: LoginReducer,
  SignupData: SignupReducer,
  LogoutData:LoginReducer
});
export default reducers;
