"use client";
import React, { useState } from "react";
import { Stack, Box, Text } from "@chakra-ui/react";
import MoodTextBox from "./moodTextBox"; // Import the MoodSlider component
import NavBar from "@/components/NavBar";
import axios from "axios"; // Import axios

export default function HealthPage() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Function to handle the submission of mood
  const submitMood = async (moodValue) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/mood-log",
        { mood: moodValue },
        { withCredentials: true }
      );
      console.log("Mood submitted successfully:", response.data);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error submitting mood:", error.message);
      setSubmissionStatus("error");
    }
  };

  // Handle mood change (triggered by slider submission)
  const handleMoodChange = async (moodValue) => {
    setSubmissionStatus("loading"); // Set loading state while waiting for API response
    await submitMood(moodValue); // Call the submitMood function
  };

  return (
    <Stack
      spacing={4}
      direction="column"
      align="center"
      mt="5px"
      p={{ base: 4, md: 8 }}
      maxW="1200px"
      mx="auto"
    >
      <NavBar />

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
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "5px",
            marginTop: "5px",
          }}
        >
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
