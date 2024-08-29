import { Button } from "@mui/material";
import React from "react";

const UploadButton = () => {
  const [file, setFile] = React.useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log(file);
  };

  return (
    <div>
      <input
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Choose file
        </Button>
        &nbsp;
        {file && file.name}
      </label>
    </div>
  );
};
export default UploadButton;
