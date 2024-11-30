"use client";

import { useState } from "react";
import { Stack, HStack, Input, Button, Link } from "@chakra-ui/react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      setLoading(false);
  
      if (response.ok) {
        window.location.href = result.redirectUrl("/homePage");
      } else {
        setErrorMessage(result.message || "An error occurred. Please try again later.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Stack spacing={4} align="center" mt="20px">
      <HStack spacing={1}>
        <Image src="/logo.png" alt="MyWellBeing Logo" width={50} height={50} />
        <h1 style={{ color: "teal", fontWeight: "bold", fontSize: "24px" }}>MyWellBeing</h1>
      </HStack>

      <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "40px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Log in</h1>

        <Stack spacing={4}>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <Button
          size="lg"
          variant="solid"
          colorScheme="teal"
          width="200px"
          mt="20px"
          type="submit"
          isLoading={loading}
          loadingText="Logging in..."
        >
          Log in
        </Button>

        <Link href="/registerPage" mt="10px">
          <p style={{ fontSize: "12px", textDecoration: "underline" }}>Register for an account</p>
        </Link>
      </form>
    </Stack>
  );
}
