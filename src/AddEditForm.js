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
import { isEmpty } from "lodash";

const initialState = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  status: "",
  link: "",
};
const JobForm = (props) => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues(props.data);
    }
  }, [props.data]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmpty(props.data)) props.add(values);
    else props.edit(values);
  };

  const reset = () => {
    setValues(initialState);
  };
  const del = (event) => {
    event.preventDefault();
    props.delete(values);
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Date Applied"
            type="date"
            name="dateApplied"
            value={values.dateApplied}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
              <MenuItem value="not-applied">Not-Applied</MenuItem>
              <MenuItem value="applied">Applied</MenuItem>
              <MenuItem value="interviewing">Interviewing</MenuItem>
              <MenuItem value="offer">Offer</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} spacing={3}>
          <TextField
            required
            fullWidth
            label="Link"
            name="link"
            value={values.link}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {isEmpty(props.data) ? (
            <>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Button variant="contained" color="primary" onClick={del}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" variant="contained" color="primary">
                Edit
              </Button>
              &nbsp; &nbsp; &nbsp;
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
