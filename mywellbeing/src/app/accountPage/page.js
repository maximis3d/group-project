"use client";
import { useEffect, useState } from "react";
import { Link, Text, Button, HStack, Stack, Spinner } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

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

  // Fetch the current user details from the backend
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
      {/*****************************************Start of header*****************************************/}
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

      {/* Custom divider */}
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "center", 
        marginTop: "20px"
      }}>
        {/* Render user details */}
        <Field label="Your name" color="grey" mt="20px"> 
          <HStack>
            <Input
              value={formData.username}
              onChange={handleChange("username")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("username")}>Change</Button>
          </HStack>
        </Field>

        <Field label="Your email" color="grey" mt="20px">
          <HStack>
            <Input
              value={formData.email}
              onChange={handleChange("email")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("email")}>Change</Button>
          </HStack>
        </Field>

        <Field label="Your date of birth" color="grey" mt="20px">
          <HStack>
            <Input
              value={formData.dob}
              onChange={handleChange("dob")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("dob")}>Change</Button>
          </HStack>
        </Field>

        <Field label="Your height" color="grey" mt="20px">
          <HStack>
            <Input
              value={formData.height}
              onChange={handleChange("height")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("height")}>Change</Button>
          </HStack>
        </Field>

        <Field label="Your weight" color="grey" mt="20px">
          <HStack>
            <Input
              value={formData.weight}
              onChange={handleChange("weight")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("weight")}>Change</Button>
          </HStack>
        </Field>

        <Field label="Your phone number" color="grey" mt="20px">
          <HStack>
            <Input
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
              size="md"
              width="200px"
            />
            <Button size="sm" colorPalette="teal" onClick={() => handleUpdate("phoneNumber")}>Change</Button>
          </HStack>
        </Field>

        <Button as={Link} href="/loginPage" size="lg" variant="solid" width="200px" colorPalette="red" mt="20px" mb="20px">
          Log out
        </Button>
      </div>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}
