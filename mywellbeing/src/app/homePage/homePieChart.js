"use client"
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Protein', value: 1200 },
  { name: 'Fats', value: 500 },
  { name: 'Carbs', value: 400 },
  { name: 'Calories', value: 350 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function renderCustomLabel({ name, value, x, y }) {
  return (
    <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central">
      {`${name}: ${value}`}
    </text>
  );
}



export default class HomeChart extends PureComponent {

  render() {
    return (
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "left",
        marginTop: "40px",
      }}>

<h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom:"20px" }}>Overall progress</h1>
      <PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </div>
    );
  }
}
