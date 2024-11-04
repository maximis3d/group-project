"use client";

import { Link, Text, Button, HStack, Stack, Image } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Flex } from "@chakra-ui/react";

export default function GoalsPage() {
  const data = [
    { name: 'Week 1', you: 70 },
    { name: 'Week 2', you: 72 },
    { name: 'Week 3', you: 72 },
    { name: 'Week 4', you: 71 },
    { name: 'Week 5', you: 75 },
    { name: 'Week 6', you: 81 },
    { name: 'Week 7', you: 97 },
  ];
  
  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      width="100%"  // Ensure full width
      mt="20px" 
    >
      {/*****************************************Start of header section*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center">
        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Home</p>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Meals</p>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Health</p>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Goals</p>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Account</p>
        </Link>
      </HStack>

      {/* Custom divider */}
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
    {/*****************************************End of header section*****************************************/}
     

    {/*****************************************Start of main body section*****************************************/}

      <h1 style={{fontWeight: "bold", fontSize:"24px"}}>Your goals</h1>
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",  // Aligns items to the left
        justifyContent: "flex-start",
        width: "100%",  // Full width for flexibility
        maxWidth: "400px",  // Limit width for layout control
        marginTop: "40px",
        marginLeft: "0px",  // Adjust this value to move more left
        marginRight: "70px"
      }}>
        

        <LineChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[50, 100]} 
            label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="you" stroke="#82ca9d" />
        </LineChart>
      </div>
{/*****************************************End of main body section*****************************************/}

{/*****************************************Start of bottom body section*****************************************/}
    <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "left",
        marginTop: "40px",
      }}>
    
    
        <h1 style={{fontWeight: "bold", fontSize:"20px"}}>Enter or change your weight</h1>
         <Flex className="inputContainer" gap="4" mt="20px"> 
            <Field label="Weight(kg)" color="grey">
               <Input placeholder="Enter your weight" size="md" width="300px" />
            </Field>
          </Flex>

          <Button as={Link} href="" size="lg" variant="solid" colorPalette="teal" width="200px" marginTop="20px">
            Change
        </Button>

    </div>
 {/*****************************************End of bottom body section*****************************************/}
    </Stack>
  );
}
