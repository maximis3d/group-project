"use client";  // Makes sure the chart only renders on the client side

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Monday', Mood: 65},
  { name: 'Tuesday', Mood: 70},
  { name: 'Wednesday', Mood: 73},
  { name: 'Thursday', Mood: 78},
  { name: 'Friday', Mood: 83},
  { name: 'Saturday', Mood: 85 },
  { name: 'Sunday', Mood: 88,},
];

export default class ChartGoal extends PureComponent {
  render() {
    return (
      
      <div style={{ width: '350px', height: '300px', marginRight: '30px'}}> {/* Set fixed height */}
        <ResponsiveContainer width="100%" height="100%">

          
        <h1 style={{ fontweight: "bold", fontSize: "24px", marginBottom:"20px", marginTop:"20px" }}>Overall Progress</h1>
        
          <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Mood Level', angle: -90, position: 'insideLeft', dy: 0 }} /> {/* Added Y-axis label */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Mood" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    );
  }
}
