import React, { useState } from "react";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";
const KEY = process.env.REACT_APP_CLIENT_ID;

export const FilePicker = () => {
  const [data, setData] = useState({});
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div className="mainDiv">
        <ReactOneDriveFilePicker
          clientID={KEY}
          action="share"
          multiSelect={true}
          onSuccess={(result) => {
            setData(result);
          }}
          onError={(error) => {
            console.error(error);
          }}
        >
          <button>Open File Picker</button>
        </ReactOneDriveFilePicker>
      </div>
      {data.value ? (
        <div className="filePicker">
          <h2>Name : {data.value[0].name}</h2>
          <span>
            Link :{" "}
            <a href={data.value[0].webUrl} target="_blank" rel="noreferrer">
              Click Here
            </a>
          </span>
        </div>
      ) : null}
    </div>
  );
};
