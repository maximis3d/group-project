"use client";
import React, { useState } from "react";
import { Stack, Box, Text, Input, Center } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { CiFaceSmile, CiFaceMeh, CiFaceFrown } from "react-icons/ci";

const MoodTextBox = ({ onMoodChange }) => {
  const [value, setValue] = useState(100); // Set initial mood value to 100
  const [error, setError] = useState(""); // To store validation error message

  // Get the appropriate face icon based on the mood value
  const getFaceIcon = (value) => {
    if (value >= 70) return <CiFaceSmile size={50} color="green" />;
    if (value >= 40) return <CiFaceMeh size={50} color="orange" />;
    return <CiFaceFrown size={50} color="red" />;
  };

  // Handle input change, ensure the value is a number and within range
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Allow empty input to reset the value
    if (newValue === "") {
      setValue("");
      setError("");
      return;
    }

    // Convert to number, and check if it's valid
    newValue = parseInt(newValue, 10);

    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setValue(newValue);
      setError(""); // Clear error if valid
    } else {
      setError("Please enter a valid number between 0 and 100.");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!error) {
      onMoodChange(value); // Pass valid value to parent component
    }
  };

  return (
    <Center> {/* Centering the entire content */}
      <Box maxWidth="400px" textAlign="center" p={4} width="fit-content">
        <Stack spacing={6} align="center">
          {/* Mood Icon and Text */}
          <Stack spacing={2} align="center">
            <Box>{getFaceIcon(value)}</Box>
            <Text fontSize="md">Mood: {value}</Text>
          </Stack>

          {/* Input Field for Mood Value */}
          <Field>
            <Input
              type="number"
              value={value === "" ? "" : value} // If the value is empty, keep it empty in the input box
              onChange={handleChange}
              min={0}
              max={100}
              placeholder="Enter mood value (0-100)"
              textAlign="center" // Center the text inside the input box
              width="100%" // Ensures the input takes up full width
              maxWidth="400px" // Set a max width to keep the box consistent
            />
          </Field>

          {/* Show error if invalid input */}
          {error && (
            <Text color="red" fontSize="sm" mt={2}>
              {error}
            </Text>
          )}

          {/* Submit Button */}
          <Button 
            size="lg" 
            variant="solid" 
            colorScheme="teal" 
            onClick={handleSubmit}
            width="100%" // Ensures the button takes up full width
            maxWidth="400px" // Set max width to match the input box width
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default MoodTextBox;
