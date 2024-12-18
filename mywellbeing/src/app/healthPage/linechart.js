import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function LineChartComponent({ moodData }) {
  const chartData = {
    labels: moodData.map((log) => log.date),
    datasets: [
      {
        label: "Mood",
        data: moodData.map((log) => log.mood),
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Mood: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Mood (1-100)",
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

  return <Line data={chartData} options={options} />;
}
