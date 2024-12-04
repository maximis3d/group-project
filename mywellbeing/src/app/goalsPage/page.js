"use client";
import { Link, Stack, HStack, Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ChartGoal from "./goalChart";

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
    <Stack spacing={4} direction="column" align="center" mt="20px">
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
        <Link href="/addFoods" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Add Foods</p>
        </Link>
      </HStack>  

      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Track Your Goals</h1>
        <p style={{ fontSize: "16px", color: "gray" }}>
          Keep track of your progress and stay on top of your health goals.
        </p>
      </div>

      <ChartGoal /> {/* Render the ChartGoal component */}

      <div style={{ textAlign: "center", marginTop: "40px", width: "300px" }}>
        {/* Label and Input fields */}
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="weight" style={{ fontSize: "16px", fontWeight: "bold", color: "gray" }}>
            Add New Weight
          </label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight in KG"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            style={{ marginTop: "8px" }}
          />
        </div>

        <Button
          colorScheme="teal"
          isLoading={loading}
          onClick={handleAddWeight}
          style={{ width: "100%" }}
        >
          Add Weight Log
        </Button>
      </div>

      <div style={{ width: "80%", marginTop: "40px" }}>
        <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Weight Logs</h3>
        <ul style={{ listStyle: "none", paddingLeft: "0", marginTop: "16px" }}>
          {weightLogs.map((log, index) => (
            <li key={index} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                {new Date(log.date).toLocaleDateString()} - {log.weight} kg
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stack>
  );
}
