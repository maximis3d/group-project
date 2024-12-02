// authHandler.js

export async function handleAuthentication(endpoint, credentials, redirectUrl) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies if needed
        body: JSON.stringify(credentials),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "An error occurred. Please try again later.");
      }
  
      // Redirect on success
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }
  