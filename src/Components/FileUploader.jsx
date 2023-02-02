import React, { useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";
import { loginRequest } from "../Auth/authConfig";

export const FileUploader = () => {
  const isAuthenticated = useIsAuthenticated();
  const [file, setFile] = useState({});
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState("");
  const handleUploadFile = async () => {
    !isAuthenticated &&
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        setToken(response.accessToken);
      });
    const endpoint = `https://graph.microsoft.com/v1.0/me/drive/items/root:/${file.name}:/content`;
    try {
      await axios.put(endpoint, file, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type,
        },
      });
      alert("File Uploaded Successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <input
        style={{
          position: "absolute",
          left: "200px",
          top: "15px",
        }}
        type={"file"}
        onChange={(e) => handleFileChange(e)}
      />
      <button onClick={handleUploadFile}>Upload a File</button>
    </div>
  );
};
