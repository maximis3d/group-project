import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

export default function healthPage() {
  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center">


        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px' }}>Home</p>
        </Link>


        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px' }}>Meals</p>
        </Link>

        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px'}}>Health</p>
        </Link>

        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: '20px', padding: '0 15px'}}>Account</p>
        </Link>
      </HStack>

      {/* Custom divider */}
      <div style={{ width: "400px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",  // Aligns items to the right
        justifyContent: "flex-start",
        width: "300px",
        height: "100px", 
        textAlign: "center",      // Ensures text aligns to the right
        marginTop: "40px"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Health page under construction. Coming 2025 ٩(^ᗜ^ )و </h1>

        
      </div>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}
