"use client"
import React from 'react';  // Add this import
import { Link, Button, HStack, Stack, Image } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import LineChartComponent from "./linechart";  // Import the chart component
import ChartMood from "./goalMood";
import MoodSlider from "./healthslider";

export default function HealthPage() {
  const chartRef = React.useRef();

  const handleMoodSubmit = (moodValue) => {
    if (chartRef.current) {
      chartRef.current.updateSundayMood(moodValue);
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      {/*****************************************Start of header*****************************************/}
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
      {/*****************************************Header Section End*****************************************/}
      
      
        <ChartMood ref={chartRef} />
        
      <div
        className="bodyContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "800px",
          minHeight: "200px",
          textAlign: "center",
          marginTop: "10px",
          padding: "0 10px"
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <MoodSlider onMoodSubmit={handleMoodSubmit} />
        </div>
      </div>


      {/*****************************************Main Body Section End*****************************************/}
    </Stack>
  );
}
