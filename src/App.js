import "./App.css";
import EnhancedTable from "./EnhancedTable";
import { useEffect, useState } from "react";
import {
  getAllJobs,
  addJob,
  editJob,
  deleteJob,
} from "./redux/actions/JobActions";
import { connect } from "react-redux";
import Dialog from "./Dialog";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Spinner from "./Spinner";
import ConfirmDelete from "./ConfirmDelete";

const App = (props) => {
  //const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.getAllJobs();
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
  return (
    <div className="App">
      {props.isLoading && <Spinner />}
      <h1>DASHBOARD</h1>
      <div className="enhanced-table">
        <Button
          variant="contained"
          style={{
            // position: "fixed",
            // right: 65,
            // top: "14%",
            marginBottom: "10px",
            height: "54px",
          }}
          onClick={addBtnClick}
        >
          Add Data
        </Button>
        &nbsp;&nbsp;
        <TextField
          id="standard-basic"
          label="Search"
          variant="outlined"
          type="search"
          onChange={handleSearch}
        />
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
          data={selectedData}
          add={addData}
          edit={editData}
          delete={deleteData}
        />
        <ConfirmDelete
          deleteRow={deleteData}
          open={openConfirmBox}
          handleClose={closeConfirmBox}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.jobReducer.data,
    isLoading: state.spinnerReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobs: (data) => dispatch(getAllJobs(data)),
    addJob: (data) => dispatch(addJob(data)),
    editJob: (data) => dispatch(editJob(data)),
    deleteJob: (data) => dispatch(deleteJob(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
