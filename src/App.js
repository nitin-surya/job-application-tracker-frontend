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

const App = (props) => {
  //const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

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

  const deleteData = (data) => {
    props.deleteJob(data);
    setOpen(false);
  };

  return (
    <div className="App">
      <h1>JOB APPLICATION TRACKER</h1>
      <div className="enhanced-table">
        <Button
          variant="contained"
          style={{
            position: "fixed",
            right: 65,
            top: "14%",
          }}
          onClick={addBtnClick}
        >
          Add Data
        </Button>
        <EnhancedTable data={props.data} onRowClick={onRowClick} />
        <Dialog
          close={closeDialog}
          open={open}
          data={selectedData}
          add={addData}
          edit={editData}
          delete={deleteData}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.jobReducer.data,
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
