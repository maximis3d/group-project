import { Link, Button, HStack, Stack, Image, Flex, Input, Text, Box } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import ChartGoal from "./goalChart";
import LineChartComponent from "../healthPage/linechart";
import { Field } from "@/components/ui/field"; 
import NavBar from "@/components/NavBar";

export default function goalsPage() {
  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/*****************************************Start of header*****************************************/}
      <NavBar /> 
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
