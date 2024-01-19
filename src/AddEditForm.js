import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { isEmpty, values } from "lodash";
import moment from "moment";

const initialState = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  status: "",
  link: "",
  dateLastUpdated: "",
  updatedBy:""
};
const JobForm = (props) => {
  const [values, setValues] = useState(initialState);
  // const [edit] = useState(!isEmpty(props.data));
  const [edit] = useState(false);

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues(props.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData={...values}
    formData={
      ...formData,
      dateLastUpdated:formData.dateApplied,
      status:"Applied",
    }
    if (isEmpty(props.data)) props.add(formData);
    else props.edit(formData);
  };

  const reset = () => {
    setValues(props.data ? props.data : initialState);
  };
  const del = (event) => {
    event.preventDefault();
    props.delete(values);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // add leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, "0"); // add leading zero if needed
    const year = date.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={false}
            fullWidth
            label="Company"
            name="company"
            value={values.company}
            onChange={handleChange}
            helperText=""
            disabled={edit}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={values.jobTitle}
            onChange={handleChange}
            disabled={edit}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Date Added"
            type="date"
            name="dateApplied"
            value={moment(formatDate(values.dateApplied))
              .format("yyyy-MM-DD")
              .toString()}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={edit}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              required
              labelId="status-label"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Not Applied">Not-Applied</MenuItem>
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Screening">Screening</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Written Test">Written Test</MenuItem>
              <MenuItem value="Interviewing">Interviewing</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Date Last Updated"
            type="date"
            name="dateLastUpdated"
            value={moment(formatDate(values.dateLastUpdated))
              .format("yyyy-MM-DD")
              .toString()}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
        <TextField
            required
            error={false}
            fullWidth
            label="Updated By"
            name="updatedBy"
            value={values.updatedBy}
            onChange={handleChange}
            helperText=""
            disabled={edit}
          />













          
        </Grid>

        <Grid item xs={12} spacing={3}>
          <TextField
            required
            fullWidth
            label="Link"
            name="link"
            value={values.link}
            onChange={handleChange}
            disabled={edit}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <UploadButton />
        </Grid> */}

        <Grid item xs={12}>
          {isEmpty(props.data) ? (
            <>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Button variant="contained" color="primary" onClick={del}>
                Delete
              </Button>
            </>
          )}
          &nbsp; &nbsp; &nbsp;
          <Button variant="contained" color="primary" onClick={reset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default JobForm;
