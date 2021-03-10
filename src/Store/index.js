import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers";

const appyCustomMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(thunk);
  } else {
    return applyMiddleware(thunk, createLogger());
  }
};

export default createStore(reducers, composeWithDevTools(appyCustomMiddleware()));
