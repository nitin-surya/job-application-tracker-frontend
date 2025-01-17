// src/components/Dashboard.js
import React, { useCallback, useEffect } from "react";
import StackedBarChart from "./StackedBarChart";
import StatusPieChart from "./StatusPieChart";
import JobTypePieChart from "./JobTypePieChart";
import { useDispatch } from "react-redux";
import "./Dashboard.css"; // Import the updated CSS file
import { getYearlyData } from "../../redux/actions/DashboardActions";

const staticData = {
  total: 19,
  keys: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  data: [
    {
      month: "January",
      total: 2,
      monthJobTypeData: { Fulltime: 1, W2: 1, C2C: 0 },
    },
    {
      month: "February",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "March",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "April",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "May",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "June",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "July",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "August",
      total: 17,
      monthJobTypeData: { Fulltime: 13, W2: 4, C2C: 0 },
    },
    {
      month: "September",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "October",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "November",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
    {
      month: "December",
      total: 0,
      monthJobTypeData: { Fulltime: 0, W2: 0, C2C: 0 },
    },
  ],
  yearStatusData: {
    Applied: 16,
    Screening: 0,
    Rejected: 2,
    "Written Test": 1,
    Interviewing: 0,
    Offer: 0,
  },
  yearJobType: { Fulltime: 14, W2: 5, C2C: 0 },
};

const YearlyData = (props) => {
  const dispatch = useDispatch();
  // Define the getData function using useCallback
  const getData = useCallback(async () => {
    try {
      const result = await dispatch(getYearlyData()); // Await the dispatch
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch]);

  // Use useEffect to call getData on page load
  useEffect(() => {
    getData();
  }, [getData]); // Include getData in the dependency array
  return (
    <div className="dashboard-container">
      <div className="bar-chart-container">
        <StackedBarChart data={staticData} />
      </div>
      <div className="pie-charts-container">
        <div className="pie-chart">
          <StatusPieChart yearStatusData={staticData.yearStatusData} />
        </div>
        <div className="pie-chart">
          <JobTypePieChart yearJobType={staticData.yearJobType} />
        </div>
      </div>
    </div>
  );
};

export default YearlyData;
