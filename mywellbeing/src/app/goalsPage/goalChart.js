"use client";  // Makes sure the chart only renders on the client side

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Week 1', Weight: 65},
  { name: 'Week 2', Weight: 70},
  { name: 'Week 3', Weight: 73},
  { name: 'Week 4', Weight: 78},
];

export default class ChartGoal extends PureComponent {
  render() {
    return (
      
      <div style={{ width: '350px', height: '300px', marginRight: '30px'}}> {/* Set fixed height */}
        <ResponsiveContainer width="100%" height="100%">

          
        <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom:"20px", marginTop:"20px" }}>Your progress</h1>
        
          <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Weight in KG', angle: -90, position: 'insideLeft', dy: 0 }} /> {/* Added Y-axis label */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Weight" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    );
  }
}
