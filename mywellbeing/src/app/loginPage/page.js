"use client"
import { useState } from "react";
import { Link, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Send the login request to the backend
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // Redirect to the dashboard on success
        window.location.href = result.redirectUrl || "/dashboard";
      } else {
        // Handle errors, show message
        setErrorMessage(result.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={1} className="headerContainer" align="center">
        <Image src="/logo.png" alt="MyWellBeing Logo" width={50} height={50} />
        <h1 style={{ color: "teal", fontWeight: "bold", fontSize: "24px" }}>MyWellBeing</h1>
      </HStack>
      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "40px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Log in</h1>

        <Field label="Email" mt="20px" color="grey" helperText="We'll never share your email.">
          <Input
            placeholder="Enter your email"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Password" color="grey" mt="20px">
          <Input
            placeholder="Enter your password"
            size="md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
  
        {/*****************************************End of Main body section*****************************************/}  

        {/*****************************************Start of bottom body section*****************************************/}
        <div className="bottomContainer" style={{ marginTop: "40px" }}>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
          )}
          <Button
            size="lg"
            variant="solid"
            colorPalette="teal"
            width="200px"
            type="submit"
            isLoading={loading}
            loadingText="Logging in..."
          >
            Log in
          </Button>
          
          <Link href="registerPage" mt="10px">
            <p style={{ fontSize: '12px', textDecoration: 'underline' }}>Register for an account</p>
          </Link>
        </div>
        {/*****************************************End of bottom body section*****************************************/}
      </form>
    </Stack>
  );
}
