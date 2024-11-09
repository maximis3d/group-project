import { Link, Button, HStack, Stack, Image, Flex, Field, Input } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import ChartGoal from "./goalChart";
import LineChartComponent from "../healthPage/linechart";


export default function goalsPage() {
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
        
      </HStack>

      {/* Custom divider */}
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************Header Section End*****************************************/}
      
      {/* Body Section */}
      <ChartGoal />
      <div
        className="bodyContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "300px",
          height: "100px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >



      </div>


        
      {/* Render the LineChartComponent here */}
        

      {/*****************************************Main Body Section End*****************************************/}
    </Stack>
  );
}
