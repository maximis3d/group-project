"use client";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { calculateMacronutrients } from '../../utils/MacroMicroNutrients';

// Define the total daily calories
const TOTAL_CALORIES = 1000;

// Calculate macronutrients based on the fixed total calories
const macros = calculateMacronutrients(TOTAL_CALORIES);

// Prepare data for the pie chart
const data = [
  { name: 'Calories', value: TOTAL_CALORIES },
  { name: 'Protein', value: macros.Protein },
  { name: 'Fats', value: macros.Fats },
  { name: 'Carbs', value: macros.Carbohydrates },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function renderCustomLabel({ name, value, x, y }) {
  return (
    <text x={x} y={y} fill="TEAL" textAnchor="middle" dominantBaseline="central">
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
        marginTop: "20px",
      }}>


      <PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={140}
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
