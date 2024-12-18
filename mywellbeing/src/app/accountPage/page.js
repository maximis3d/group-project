"use client";
import React, { useState, useEffect } from "react";
import { Link, Button, HStack, Stack, Spinner, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";

async function handleLogout() {
  try {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include", 
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Logged out successfully");
      window.location.href = "/loginPage";
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Failed to log out");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("An error occurred during logout.");
  }
}

export default function AccountPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    weight: "",
    height: "",
    age: 0,
    activity: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setFormData({
            username: data.username,
            email: data.email,
            dob: data.dob,
            weight: data.weight,
            height: data.height,
            age: data.age,
            activity: data.activity,
          });
          setIsLoading(false);
        } else {
          setError(data.message || "Failed to fetch user details");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching user details.");
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    if (!formData.username) {
      errors.username = "Username is required.";
    }

    // Validate email
    const emailRegex = /.+@.+\..+/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
     // Validate password
     if (formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Validate age
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18) {
      errors.age = "Age must be a number and at least 18.";
    }

    // Validate date of birth
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formData.dob || !dobRegex.test(formData.dob)) {
      errors.dob = "Please enter a valid date of birth in YYYY-MM-DD format.";
    }

    // Validate weight
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      errors.weight = "Weight must be a positive number.";
    }

    // Validate height
    if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
      errors.height = "Height must be a positive number.";
    }

    // Validate activity level
    const validActivityLevels = ["Not Active", "Lightly Active", "Moderately Active", "Very Active"];
    if (!validActivityLevels.includes(formData.activity)) {
      errors.activity = "Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (field) => {
    if (!validateForm()) {
      return; // Stop update if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/update-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: formData[field] }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert(`${field} updated successfully`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("An error occurred while updating details.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password updated successfully.");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating password.");
    }
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      <NavBar />
      <div
        className="bodyContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "300px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Text fontSize="24px" fontWeight="bold">Edit Personal Details</Text>
        
        {/* Render the fields */}
        {[
          { label: "Your name", fieldName: "username" },
          { label: "Your email", fieldName: "email" },
          { label: "Your date of birth", fieldName: "dob" },
          { label: "Your height", fieldName: "height" },
          { label: "Your weight", fieldName: "weight" },
          { label: "Your age", fieldName: "age" },
          { label: "Your activity level", fieldName: "activity" },
        ].map(({ label, fieldName }) => (
          <Field key={fieldName} label={label} color="grey" mt="20px">
            <HStack>
              <Input
                value={formData[fieldName]}
                onChange={handleChange(fieldName)}
                size="md"
                width="200px"
              />
              <Button size="sm" colorScheme="teal" onClick={() => handleUpdate(fieldName)}>
                Change
              </Button>
            </HStack>
            {formErrors[fieldName] && (
              <Text color="red" fontSize="12px">{formErrors[fieldName]}</Text>
            )}
          </Field>
        ))}

        {/* Password Change Field */}
        <Field label="New Password" color="grey" mt="20px">
          <HStack>
            <Input
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorScheme="teal" onClick={handlePasswordUpdate}>
              Update Password
            </Button>
          </HStack>
          {formErrors.password && (
            <Text color="red" fontSize="12px">{formErrors.password}</Text>
          )}
        </Field>

        <Field label="Confirm Password" color="grey" mt="20px">
          <HStack>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              size="md"
              width="200px"
            />
          </HStack>
          {formErrors.confirmPassword && (
            <Text color="red" fontSize="12px">{formErrors.confirmPassword}</Text>
          )}
        </Field>

        <Button
          size="lg"
          variant="solid"
          width="200px"
          colorScheme="red"
          mt="20px"
          mb="20px"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </Stack>
  );
}
