// src/components/StackedBarChart.js
import React from "react";
import { Chart } from "primereact/chart";

const StackedBarChart = ({ data }) => {
  // Extract months and job type data
  const months = data.keys;
  const monthData = data.data;

  // Initialize job type datasets with zeros
  const jobTypes = ["Fulltime", "W2", "C2C"];
  const datasets = jobTypes.map((jobType) => ({
    label: jobType,
    data: months.map((month) => {
      const monthInfo = monthData.find((d) => d.month === month);
      return monthInfo ? monthInfo.monthJobTypeData[jobType] || 0 : 0;
    }),
    backgroundColor:
      jobType === "Fulltime"
        ? "#42A5F5"
        : jobType === "W2"
        ? "#66BB6A"
        : "#FF7043",
    stack: "stack0",
  }));

  const chartData = {
    labels: months,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
