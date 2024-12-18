"use client"
<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Stack, Box, Text, Input, Button } from "@chakra-ui/react";
import MoodTextBox from "./moodTextBox";
import NavBar from "@/components/NavBar";
import axios from "axios";
import LineChartComponent from "./linechart";

export default function HealthPage() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [moodLogs, setMoodLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchMoodLogs = async (start = "", end = "") => {
    try {
      const response = await axios.get("http://localhost:5000/mood-logs", {
        params: { startDate: start, endDate: end },
        withCredentials: true,
      });
      const transformedLogs = response.data.map((log) => ({
        date: new Date(log.date).toISOString(), // Ensure consistent ISO format
        mood: log.mood,
      }));
      setMoodLogs(transformedLogs);
    } catch (error) {
      console.error("Error fetching mood logs:", error);
    }
  };
  

  useEffect(() => {
    fetchMoodLogs();
  }, []);

  const submitMood = async (moodValue) => {
    try {
      await axios.post(
        "http://localhost:5000/mood-log",
        { mood: moodValue },
        { withCredentials: true }
      );
      setSubmissionStatus("success");
      await fetchMoodLogs(); // Refresh the mood logs after submission
    } catch (error) {
      console.error("Error submitting mood:", error.message);
      setSubmissionStatus("error");
    }
  };

  const handleMoodChange = async (moodValue) => {
    setSubmissionStatus("loading");
    await submitMood(moodValue);
  };

  const handleFilter = async () => {
    await fetchMoodLogs(startDate, endDate);
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <NavBar />
      <Box>
        <Text fontWeight="bold" mb={2}>
          Filter by Date Range:
        </Text>
        <Stack direction="row" spacing={2} align="center">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <Button colorScheme="teal" onClick={handleFilter}>
            Apply
          </Button>
        </Stack>
      </Box>
      <LineChartComponent moodData={moodLogs} />
      <Box
>>>>>>> origin/main
        style={{
          padding: "15px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "550px",
          marginTop: "100px",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
<<<<<<< HEAD
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
=======
          textAlign: "center",
          border: "2px solid teal",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "5px", marginTop: "5px" }}>
          Add today’s mood
        </h1>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <MoodTextBox onMoodChange={handleMoodChange} />
        </div>
        {submissionStatus === "loading" && <Text>Submitting...</Text>}
        {submissionStatus === "success" && <Text color="green">Mood submitted successfully!</Text>}
        {submissionStatus === "error" && <Text color="red">Error submitting mood. Please try again.</Text>}
      </Box>
>>>>>>> origin/main
    </Stack>
  );
}
