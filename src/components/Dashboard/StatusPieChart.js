// src/components/StatusPieChart.js
import React from "react";
import { Chart } from "primereact/chart";

const StatusPieChart = ({ yearStatusData }) => {
  const data = {
    labels: Object.keys(yearStatusData),
    datasets: [
      {
        data: Object.values(yearStatusData),
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FF7043",
          "#FFCA28",
          "#8E24AA",
          "#E53935",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Legend position on the right
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <Chart type="pie" data={data} options={options} />;
};

export default StatusPieChart;
