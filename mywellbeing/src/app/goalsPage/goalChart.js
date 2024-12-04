import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartGoal = () => {
  const [weightLogs, setWeightLogs] = useState([]);

  useEffect(() => {
    const fetchWeightLogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/weight-logs", { withCredentials: true });
        setWeightLogs(response.data);
      } catch (error) {
        console.error("Error fetching weight logs:", error);
      }
    };
    fetchWeightLogs();
  }, []);

  // Format data for the chart
  const chartData = weightLogs.map(log => ({
    name: new Date(log.date).toLocaleDateString(),
    Weight: log.weight,
  }));

  return (
    <div style={{ width: '350px', height: '300px', marginRight: '30px' }}>
      <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom:"20px", marginTop:"20px" }}>Weight Progress</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Weight in KG', angle: -90, position: 'insideLeft', dy: 0 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Weight" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartGoal;
