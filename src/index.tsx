import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import "./services/firebase";
import App from "./App";

import "react-toastify/dist/ReactToastify.min.css";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
