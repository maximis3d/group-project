import { Link, Button, HStack, Stack, Image } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import LineChartComponent from "./linechart";  // Import the chart component

export default function HealthPage() {
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
      {/*****************************************Header Section End*****************************************/}

      {/* Body Section */}
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
        <Image
          height="200px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/330px-Smiley.svg.png"
          alt="Smiley Face"
        />
        <Slider width="100px" defaultValue={[40]} />
        <Button>Submit</Button>
      </div>

      {/* Render the LineChartComponent here */}
      <LineChartComponent />

      {/*****************************************Main Body Section End*****************************************/}
    </Stack>
  );
}