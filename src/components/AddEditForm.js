import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { isEmpty } from "lodash";
import moment from "moment";

const initialState = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  status: "",
  link: "",
  dateLastUpdated: "",
  location: "",
  jobType: "",
  jobMode: "",
};

const JobForm = (props) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [edit] = useState(false);

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues(props.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    tempErrors.company = values.company ? "" : "Company is required.";
    tempErrors.jobTitle = values.jobTitle ? "" : "Job Title is required.";
    tempErrors.dateApplied = values.dateApplied
      ? ""
      : "Date Applied is required.";
    tempErrors.location = values.location ? "" : "Location is required.";
    tempErrors.jobType = values.jobType ? "" : "Job Type is required.";
    tempErrors.status = values.status ? "" : "Status is required.";
    tempErrors.link = values.link
      ? /^https?:\/\/\S+$/.test(values.link)
        ? ""
        : "Invalid link format. Use http or https."
      : "Link is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      let formData = { ...values };

      formData = {
        ...formData,
        dateLastUpdated: formatDate(new Date().toString()),
      };

      if (isEmpty(props.data)) {
        props.add(formData);
      } else {
        props.edit(formData);
      }

      setSnackbar({
        open: true,
        message: "Form submitted successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields correctly.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const reset = () => {
    setValues(props.data ? props.data : initialState);
    setErrors({});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  return (
    <Container maxWidth="md">
      <Box component="form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Company"
              name="company"
              value={values.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
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
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Date Applied"
              type="date"
              name="dateApplied"
              value={moment(formatDate(values.dateApplied))
                .format("yyyy-MM-DD")
                .toString()}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dateApplied}
              helperText={errors.dateApplied}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Location"
              name="location"
              value={values.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.jobMode}>
              <InputLabel id="job-mode-label">Job Mode</InputLabel>
              <Select
                labelId="job-mode-label"
                name="jobMode"
                label="Job Mode"
                value={values.jobMode}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </Select>
              <FormHelperText>{errors.jobMode}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.jobType}>
              <InputLabel id="job-type-label">Job Type</InputLabel>
              <Select
                required
                labelId="job-type-label"
                name="jobType"
                label="Job Type"
                value={values.jobType}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Fulltime">Fulltime</MenuItem>
                <MenuItem value="W2">W2</MenuItem>
                <MenuItem value="C2C">C2C</MenuItem>
              </Select>
              <FormHelperText>{errors.jobType}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                required
                labelId="status-label"
                name="status"
                label="Status"
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
              <FormHelperText>{errors.status}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Link"
              name="link"
              value={values.link}
              onChange={handleChange}
              error={!!errors.link}
              helperText={errors.link}
              disabled={edit}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={reset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default JobForm;
