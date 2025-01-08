import "../App.css";
import EnhancedTable from "./EnhancedTable";
import { useEffect, useState } from "react";
import {
  getAllJobs,
  addJob,
  editJob,
  deleteJob,
  getAllYears,
} from "../redux/actions/JobActions";
import { connect } from "react-redux";
import Dialog from "./Dialog";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import ConfirmDelete from "./ConfirmDelete";
import JobForm from "./AddEditForm";
import { isEmpty } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import SelectComponent from "./Select";
import Grid from "@mui/material/Grid"; // Import Grid component

const HomePage = (props) => {
  //const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    props.getAllYears();
    const currentYear = new Date().getFullYear().toString();
    console.log(typeof currentYear, currentYear);
    setYear(currentYear);
    props.getAllJobs(currentYear);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowClick = (rowData) => {
    setSelectedData(rowData);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  const closeConfirmBox = () => {
    setOpenConfirmBox(false);
  };
  const onDeleteClick = (rowData) => {
    setSelectedData(rowData);
    setOpenConfirmBox(true);
  };
  const addBtnClick = () => {
    setSelectedData({});
    setOpen(true);
  };

  const addData = (data) => {
    console.log("add data", data);
    props.addJob(data);
    setOpen(false);
  };

  const editData = (data) => {
    props.editJob(data);
    setOpen(false);
  };

  const deleteData = () => {
    props.deleteJob(selectedData);
    setOpenConfirmBox(false);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    props.getAllJobs(selectedYear);
  };

  const refreshData = (event) => {
    props.getAllJobs(year);
  };

  return (
    <div className="App">
      <div className="enhanced-table">
        {/* Use Grid for layout to align all items in a row */}
        <Grid
          container
          spacing={2} // Space between the items
          alignItems="center" // Vertically align items in the center
          justifyContent="center" // Horizontally center the items
          style={{ marginBottom: "10px" }}
        >
          {/* Add button */}
          <Grid item>
            <Button
              variant="contained"
              onClick={addBtnClick}
              style={{
                height: "54px",
              }}
            >
              <AddIcon />
            </Button>
          </Grid>

          {/* Refresh button */}
          <Grid item>
            <Button
              variant="contained"
              onClick={refreshData}
              style={{
                height: "54px",
              }}
            >
              <SyncIcon />
            </Button>
          </Grid>

          {/* Search field */}
          <Grid item>
            <TextField
              id="standard-basic"
              label="Search"
              variant="outlined"
              type="search"
              onChange={handleSearch}
            />
          </Grid>

          {/* Select field */}
          {props.yearOptions && props.yearOptions.length > 0 ? (
            <Grid item>
              <SelectComponent
                id="year"
                value={year}
                label="Year"
                options={props.yearOptions || []}
                handleChange={handleYearChange}
              />
            </Grid>
          ) : null}
        </Grid>

        <EnhancedTable
          data={props.data}
          onRowClick={onRowClick}
          search={search}
          delete={deleteData}
          onDeleteClick={onDeleteClick}
        />
        <Dialog
          close={closeDialog}
          open={open}
          title={!isEmpty(selectedData) ? "EDIT DATA" : "ADD DATA"}
          content={
            <JobForm
              data={selectedData}
              add={addData}
              edit={editData}
              delete={deleteData}
            />
          }
        />
        <Dialog
          close={closeConfirmBox}
          title={"Are you sure to delete?"}
          open={openConfirmBox}
          content={
            <ConfirmDelete delete={deleteData} close={closeConfirmBox} />
          }
          hideCloseIcon
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.jobReducer.data,
    isLoading: state.spinnerReducer.isLoading,
    yearOptions: state.jobReducer.yearOptions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobs: (data) => dispatch(getAllJobs(data)),
    addJob: (data) => dispatch(addJob(data)),
    editJob: (data) => dispatch(editJob(data)),
    deleteJob: (data) => dispatch(deleteJob(data)),
    getAllYears: (data) => dispatch(getAllYears(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
