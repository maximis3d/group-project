"use client"
import React from 'react';  // Add this import
import { Link, Button, HStack, Stack, Image, Text, Box } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import LineChartComponent from "./linechart";  // Import the chart component
import ChartMood from "./goalMood";
import MoodSlider from "./healthslider";
import NavBar from "@/components/NavBar";

export default function HealthPage() {
  const chartRef = React.useRef();

  const handleMoodSubmit = (moodValue) => {
    if (chartRef.current) {
      chartRef.current.updateSundayMood(moodValue);
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/*****************************************Start of header*****************************************/}
      <NavBar /> 
      {/*****************************************Header Section End*****************************************/}
      
      
        <ChartMood ref={chartRef} />
        

        <Box style={{
              padding: '15px',
              borderRadius: '10px',
              width: '100%', 
              maxWidth: '550px', 
              marginTop: '100px',
              alignSelf: 'center', 
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              border: '2px solid teal',
          }}>

<h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom:"5px", marginTop:"5px" }}>Add todays mood</h1>
      
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <MoodSlider onMoodSubmit={handleMoodSubmit} />
        </div>
      
      </Box>

      {/*****************************************Main Body Section End*****************************************/}
    </Stack>
  );
}
