// src/components/JobTypePieChart.js
import React from "react";
import { Chart } from "primereact/chart";

const JobTypePieChart = ({ yearJobType }) => {
  const data = {
    labels: Object.keys(yearJobType),
    datasets: [
      {
        data: Object.values(yearJobType),
        backgroundColor: ["#42A5F5", "#66BB6A", "#FF7043"],
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

export default JobTypePieChart;
