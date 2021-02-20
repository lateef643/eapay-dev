import { ADDUSERDETAILS } from "../action-types";

export const addUserDetail = (payload) => ({
  type: ADDUSERDETAILS,
  payload,
});

export const addUserLoginStarted = (payload) => ({ type: "", payload });
