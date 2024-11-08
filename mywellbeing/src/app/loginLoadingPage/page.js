"use client"
import { useEffect } from 'react';
import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function loginLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Set a timer to navigate after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      router.push('/homePage');
    }, 500);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px"
      style={{ cursor: 'default' }} // Change cursor to default as it's no longer clickable
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
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Starting your journey now</h1>
        <h2 style={{  fontSize:"12px" }}>You will be redirected shortly...</h2>
      </div>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  )
}
