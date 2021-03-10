import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";
import { reducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  form: reducer
});
