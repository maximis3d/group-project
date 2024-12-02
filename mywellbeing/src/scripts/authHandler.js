
/**
 * Handles authentication 
 * @param {String} endpoint Endpoint to fetech back end functionality
 * @param {Object} credentials Credentials to pass
 * @param {*} redirectUrl Redirect url if there are no errors
 */
export async function handleAuthentication(endpoint, credentials, redirectUrl) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include cookies when needed
      body: JSON.stringify(credentials),
    });
    
    // Await response
    const result = await response.json();

    // Error handling

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
  