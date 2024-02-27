import React from "react";
import ReactDOM from "react-dom/client";

import Widget from "./Widget.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Widget amount="39999" />
  </React.StrictMode>,
);