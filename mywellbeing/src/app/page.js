"use client"

import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/loginPage');
  };

  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
      onClick={handleClick} // This makes the entire page clickable
      style={{ cursor: 'pointer' }} // Changes the cursor to indicate it's clickable
    >
      {/*****************************************Start of header section*****************************************/}
      <HStack spacing={1} className="headerContainer" align="center">
        
        <Image
          src="/logo.png" 
          alt="MyWellBeing Logo"
          width={50} 
          height={50}
        />

        <h1 style={{ color: "teal", fontWeight: "bold", fontSize:"24px"}}>MyWellBeing</h1>
        
      </HStack>
      {/*****************************************End of header section*****************************************/}



      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "400px", 
        textAlign: "center"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Reach your goals here</h1>
        <h2 style={{  fontSize:"12px" }}>Click anywhere to begin</h2>
      </div>

      

      {/*****************************************eND of main body section*****************************************/}

    </Stack>
  )
}
