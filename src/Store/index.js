import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./reducers";

const appyCustomMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(thunk);
  } else {
    return applyMiddleware(thunk, createLogger());
  }
};

export default createStore(reducers, appyCustomMiddleware());
