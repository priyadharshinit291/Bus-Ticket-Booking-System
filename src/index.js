import React from "react";
import ReactDOM from "react-dom/client";
// Bootstrap 5 CSS and JS bundle (includes Popper for dropdowns, modals etc.)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
