"use client"

import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function healthPage() {
  const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center">


        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px' }}>Home</p>
        </Link>


        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px' }}>Meals</p>
        </Link>

        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px'}}>Health</p>
        </Link>

        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px'}}>Account</p>
        </Link>
      </HStack>

      {/* Custom divider */}
      <div style={{ width: "400px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",  // Aligns items to the right
        justifyContent: "flex-start",
        width: "300px",
        height: "100px", 
        textAlign: "center",      // Ensures text aligns to the right
        marginTop: "40px"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Health page under construction. Coming 2025 ٩(^ᗜ^ )و </h1>


      
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
        
      {/*****************************************End of main body section*****************************************/}
    </Stack>

    
  );
}
