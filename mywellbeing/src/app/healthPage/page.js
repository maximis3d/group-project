"use client"
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
    </Stack>
  );
}
