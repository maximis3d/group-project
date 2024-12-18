/**
 * Handles forms
 * @param {String} formData Data from form
 * @param {String} fetchEndpoint Endpoint to fetch back end functionality from
 * @param {String} redirectUrl Redirect url if no errors occur 
 */
export async function handleFormSubmission(formData, fetchEndpoint, redirectUrl) {
  try {
    // Convert form entries to Object
    const formObject = Object.fromEntries(formData);
    console.log("Form data:", formObject);
    

    // Formulate response
    const response = await fetch(fetchEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    //Error Handling
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Request failed");
    }

    // Await response
    const responseData = await response.json();
    console.log("Response data:", responseData);


    // Error handling
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
