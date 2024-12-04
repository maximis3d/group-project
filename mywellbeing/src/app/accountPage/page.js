"use client"
import React, { useState, useEffect } from "react";
import { Link, Button, HStack, Stack, Spinner } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

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
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
            phoneNumber: data.phoneNumber,
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

  const handleUpdate = async (field) => {
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

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      <HStack spacing={4} className="headerContainer" align="center">
        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Home</p>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Meals</p>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Health</p>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Goals</p>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Account</p>
        </Link>
      </HStack>
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "center",
        marginTop: "20px"
      }}>
        {[
          { label: "Your name", fieldName: "username" },
          { label: "Your email", fieldName: "email" },
          { label: "Your date of birth", fieldName: "dob" },
          { label: "Your height", fieldName: "height" },
          { label: "Your weight", fieldName: "weight" },
          { label: "Your phone number", fieldName: "phoneNumber" },
        ].map(({ label, fieldName }) => (
          <Field key={fieldName} label={label} color="grey" mt="20px">
            <HStack>
              <Input
                value={formData[fieldName]}
                onChange={handleChange(fieldName)}
                size="md"
                width="200px"
              />
              <Button size="sm" colorPalette="teal" onClick={() => handleUpdate(fieldName)}>
                Change
              </Button>
            </HStack>
          </Field>
        ))}
        <Button
          size="lg"
          variant="solid"
          width="200px"
          colorPalette="red"
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
