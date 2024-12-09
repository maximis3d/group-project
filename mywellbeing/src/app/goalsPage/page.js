import { Link, Button, HStack, Stack, Image, Flex, Input, Text, Box } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import ChartGoal from "./goalChart";
import LineChartComponent from "../healthPage/linechart";
import { Field } from "@/components/ui/field"; 

export default function goalsPage() {
  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center" wrap="wrap" justify="center">
        <Link href="/homePage" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Home</Text>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Meals</Text>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Health</Text>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Goals</Text>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Account</Text>
        </Link>
        <Link href="/addFoods" mt="10px" color="teal">
          <Text fontSize={{ base: '16px', md: '18px' }} padding="0 8px">Add Foods</Text>
        </Link>
      </HStack>  

      <Box width="100%" height="2px" backgroundColor="teal" margin="16px 0" />
      {/*****************************************Header Section End*****************************************/}
      
      <ChartGoal />
      
      <Box style={{
              padding: '15px',
              borderRadius: '10px',
              width: '100%', 
              maxWidth: '550px', 
              marginTop: '100px',
              alignSelf: 'center', 
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              border: '2px solid teal',
          }}>


    <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom:"5px", marginTop:"5px" }}>Add todays progress</h1>

      <Field mt="20px" color="grey">
        <Input placeholder="Enter todays weight in KG" size="md" />
      </Field>  

      <Link>  
        <Button size="lg" variant="solid" colorPalette="teal" width="100px" marginTop= "20px" >Add</Button>
        </Link>
      </Box>
      {/*****************************************Main Body Section End*****************************************/}
    </Stack>
  );
}
