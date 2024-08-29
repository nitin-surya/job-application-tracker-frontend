import React from "react";
import { Button, Grid } from "@mui/material";

const ConfirmDelete = (props) => {
  return (
    <form autoComplete="off" style={{ minWidth: "250px", textAlign: "center" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={props.delete}>
            Yes
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button variant="contained" color="error" onClick={props.close}>
            NO
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ConfirmDelete;
