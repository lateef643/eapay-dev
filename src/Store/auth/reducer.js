import { ADDUSERDETAILS } from "../action-types";

const initialState = {
  user: {
    // token: 'hyyhh'
  },
  isloading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDUSERDETAILS:
      return state;

    default:
      return state;
  }
};

export default authReducer;
