import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CalcProvider } from "./context/calcContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CalcProvider>
    <App />
  </CalcProvider>
);
