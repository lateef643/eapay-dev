import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store";
import { ThemeProvider } from "react-jss";

const theme = {
  primaryColor: "#588ac5",
  secondaryColor: "#2C4563",
  fontText: "'Roboto', sans-serif",
  textColor: "rgba(0, 0, 0, 0.4)",
};

const StoreComponent = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

const ThemeComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreComponent />
    </ThemeProvider>
  );
};

const RouterComponent = () => {
  return (
    <Router>
      <ThemeComponent />
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RouterComponent />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
