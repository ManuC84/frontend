import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "../src/reducers/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { AppProvider } from "./context";
import { API } from "../src/api/index";
import { showAuthAlert } from "./reducers/slice/authSlice";
import { toggleAuthAlert } from "../src/reducers/slice/authSlice";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

//Intercept all API responses
const { dispatch } = store;

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403)
      dispatch(toggleAuthAlert(true));

    return Promise.reject(error);
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
