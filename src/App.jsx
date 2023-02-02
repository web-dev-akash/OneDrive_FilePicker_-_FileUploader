import React from "react";
import "./App.css";
import { FilePicker } from "./Components/FilePicker";
import { FileUploader } from "./Components/FileUploader";
import logo from "./Assets/wlc.jpg";
export const App = () => {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <img width={"70px"} src={logo} alt="logo" />
        <h1>WLC Technology</h1>
      </div>
      <div className="buttonsDiv">
        <FilePicker />
        <FileUploader />
      </div>
    </div>
  );
};
