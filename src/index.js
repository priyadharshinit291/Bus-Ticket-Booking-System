import React from "react";
import ReactDOM from "react-dom/client";
// Note: Bootstrap 5 CSS/JS is loaded via CDN in public/index.html,
// so it's not imported here. This avoids it being loaded twice.
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
