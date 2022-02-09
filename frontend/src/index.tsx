import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { GlobalStore } from "./common/state/store";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore>
      <App />
    </GlobalStore>
  </React.StrictMode>,
  document.getElementById("root")
);
