export async function handleFormSubmission(formData, fetchEndpoint, redirectUrl) {
  try {
    const formObject = Object.fromEntries(formData);
    console.log('Form data:', formObject);

    const response = await fetch(fetchEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Request failed');
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
