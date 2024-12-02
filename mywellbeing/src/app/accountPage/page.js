import { Link, Button, HStack, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

// Fetch user data from the API
async function fetchUserData() {
  let userData = {};
  try {
    const response = await fetch('http://localhost:3000/user/profile', { // Corrected API endpoint
      method: 'GET',
      credentials: 'include', // Include credentials if using cookies for authentication
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    userData = await response.json(); // Parse the response as JSON
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  return userData; // Return the fetched user data
}

// Server component
export default async function AccountPage() {
  const userData = await fetchUserData(); // Fetch user data

  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/* Header Section */}
      <HStack spacing={1} className="headerContainer" align="center">
        <h1 style={{ color: "teal", fontWeight: "bold", fontSize:"24px"}}>My Account</h1>
      </HStack>

      {/* Main Body Section */}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",  
        justifyContent: "flex-start",
        width: "300px",
        marginTop: "40px"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize: "24px", width: "100%" }}>Your Details</h1> 

        <Field label="Username" color="grey" mt="20px"> 
          <Input 
            name="username"
            placeholder="Your username username" 
            size="md" 
            value={userData.username || ''} // Populate with fetched data
            readOnly
          />
        </Field>

        {/* Repeat for other fields... */}

        <Button 
          as={Link} 
          href="/editAccountPage" // Link to an edit page if needed
          size="lg" 
          variant="solid" 
          colorPalette="teal" 
          width="200px"
          mt="40px"
        >
          Edit Details
        </Button>
      </div>
    </Stack>
  );
}