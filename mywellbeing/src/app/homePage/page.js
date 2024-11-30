"use client"
import { useState, useEffect } from "react";

import { Link, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { ProgressRoot, ProgressBar, ProgressValueText } from "@/components/ui/progress";
import HomeChart from "./homePieChart";



import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "@/components/ui/stat";

const calendarToggle = [
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "2 days ago", value: "2 days ago" },
  { label: "3 days ago", value: "3 days ago" },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/validate-session", {
          credentials: "include", // Ensures cookies are sent
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          window.location.href = "/loginPage"; // Redirect if not authenticated
        }
      } catch (error) {
        console.error("Error validating session:", error);
        window.location.href = "/loginPage";
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirecting, so no need to show anything
  }

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center">
        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Home</p>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Meals</p>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Health</p>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Goals</p>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Account</p>
        </Link>
        <Link href="/addFoods" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Add Foods</p>
        </Link>
      </HStack>      
      <HomeChart />


      {/* Custom divider */}
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************End of header section*****************************************/}
  


      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "left",
        marginTop: "40px",
      }}>
        {/* Select Component */}
        <SelectRoot size="sm" style={{ width: '200px', marginBottom: "10px" }}>
          <SelectLabel color="grey">Date</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Choose a date" color="grey"/>
          </SelectTrigger>
          <SelectContent>
            {calendarToggle.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>


      


        <h1 style={{ fontWeight: "bold", fontSize: "24px", marginTop:"20px" }}>More detail</h1>
        <HStack spacing={4} className="bottomContainer" align="flex-start" width="325px" justify="flex-start">
        <div style={{
            backgroundColor: 'var(--div-background)', // CSS variable changes based on system color scheme
            padding: '15px',
            borderRadius: '10px',
            width: '550px',
            marginTop: '10px',
            alignSelf: 'flex-start'
        }}>
            

            {/* Vitamin A */}
            <StatRoot maxW="240px">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Vitamin A</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
                  <StatValueText value={740} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '2px' }}>out of 1,620</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+2% from last week</StatHelpText>
              <ProgressRoot width="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>

            {/* Vitamin B */}
            <StatRoot maxW="240px">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Vitamin B</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={1540} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 3,000</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+22% from last week</StatHelpText>
              <ProgressRoot width="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>

            {/* Vitamin C */}
            <StatRoot maxW="240px">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Vitamin C</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={2340} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 2,517</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+6% from last week</StatHelpText>
              <ProgressRoot width="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>


            {/* Vitamin D */}
            <StatRoot maxW="240px">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Vitamin D</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={340} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 4,610</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+6% from last week</StatHelpText>
              <ProgressRoot width="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>


          </div>
        </HStack>
      </div>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}
