import { Link, HStack, Stack, Box, Text } from "@chakra-ui/react";
import Image from 'next/image';
import { ProgressRoot, ProgressBar, ProgressValueText } from "@/components/ui/progress";
import NavBar from "@/components/NavBar";
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
  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/*****************************************Start of header*****************************************/}
      <NavBar /> 
      


      <SelectRoot size="sm" style={{ width: '100%', maxWidth: '300px', marginBottom: "10px" }}>
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

      <h1 style={{ fontWeight: "bold", fontSize: "24px",marginTop: "20px", marginBottom:"0px" }}>Overall progress</h1>
      
      
      <Box width="400px" height="2px" backgroundColor="teal" marginTop="5px 0" />
        <HomeChart />
      
      <Box width="400px" height="2px" backgroundColor="teal" marginTop="0px 0" />


      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <Box className="bodyContainer" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" width="100%" textAlign="center" mt="40px">
        {/* Select Component */}
        

        <Text fontWeight="bold" fontSize="24px" mt="20px">More detail</Text>
        <HStack spacing={4} className="bottomContainer" align="flex-start" width="100%" textAlign="center" justify="center" wrap="wrap">
          <Box style={{
              padding: '15px',
              borderRadius: '10px',
              width: '100%', 
              maxWidth: '500px', 
              marginTop: '10px',
              alignSelf: 'center', 
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              border: '2px solid teal',
          }}>
            {/* Vitamin A */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Protein</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
                  <StatValueText value={740} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '2px' }}>out of 1,620</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+2% from last week</StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>

            {/* Vitamin B */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Calories</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={1540} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 3,000</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+22% from last week</StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>

            {/* Vitamin C */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Carbs</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={2340} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 2,517</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+6% from last week</StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>

            {/* Vitamin D */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Fats</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText value={340} color="teal.600" fontSize="18px" formatOptions={{ style: "decimal", maximumFractionDigits: 0 }} />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of 4,610</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">+6% from last week</StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar />
              </ProgressRoot>
            </StatRoot>
          </Box>
        </HStack>
      </Box>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}
