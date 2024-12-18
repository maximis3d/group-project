"use client";
import React, { useState, useEffect } from "react";
import { Stack, Box, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import ChartGoal from "./goalChart";
import NavBar from "@/components/NavBar";

export default function GoalsPage() {
  const [newWeight, setNewWeight] = useState("");
  const [weightLogs, setWeightLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeightLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/weight-logs", { withCredentials: true });
      setWeightLogs(response.data);
    } catch (error) {
      console.error("Error fetching weight logs:", error);
    }
  };

  useEffect(() => {
    fetchWeightLogs();
  }, []);

  const handleAddWeight = async () => {
    if (!newWeight) return;

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/weight-log", { weight: newWeight }, { withCredentials: true });
      setNewWeight("");
      await fetchWeightLogs();
      alert("Weight log added successfully!");
    } catch (error) {
      console.error("Error adding weight log:", error);
      alert("Failed to add weight log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <NavBar />

      <Box textAlign="center" mb="20px">
        <Text fontSize="24px" fontWeight="bold">Track Your Goals</Text>
        <Text fontSize="16px" color="gray.400">Keep track of your progress and stay on top of your health goals.</Text>
      </Box>

      {/* Chart Container */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="500px"
        mb="40px"
        flexGrow="1"
        bg="black"
        borderRadius="md"
        boxShadow="md"
      >
        <ChartGoal weightLogs={weightLogs} />
      </Box>

      
    </Stack>
  );
}
