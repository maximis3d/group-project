import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

// Register the necessary chart elements
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const ChartGoal = ({ weightLogs }) => {
  const chartData = {
    labels: weightLogs.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: "Weight",
        data: weightLogs.map((log) => log.weight),
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Weight: ${context.parsed.y} kg`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}> {/* Adjust height here */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartGoal

