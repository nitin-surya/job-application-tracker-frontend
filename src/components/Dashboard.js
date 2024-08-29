import React from "react";
import { Button } from "@mui/material";
import { Chart } from "primereact/chart";

const Dashboard = () => {
  const data = {
    labels: ["Applied", "Interviewing", "Offer Received", "Rejected"],
    datasets: [
      {
        data: [10, 5, 2, 3],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28", "#FF7043"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <Chart type="pie" data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
