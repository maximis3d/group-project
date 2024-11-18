import { Link, Button, HStack, Stack, Heading, Input, IconButton } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import { LuSearch } from "react-icons/lu"





export default function goalsPage() {


    const data = [
        { label: "Food:", value: "Steak" },
        { label: "Calories", value: 21},
        { label: "Protein", value: 39},
        { label: "Fat", value: 12},
        { label: "Carbs", value: 2},
      ]


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
    {/*****************************************end of header*****************************************/}
    <Stack gap="8">
    <Heading pt="20px">Add Foods</Heading>
        <HStack>
        <Input placeholder="Food Name" width="300px" />    
        <IconButton aria-label="Search database">
            <LuSearch />
        </IconButton>
        </HStack>
        <DataListRoot pt="20px" orientation={"horizontal"}>
            {data.map((item) => (
                <DataListItem
                    key={item.label}
                    label={<strong>{item.label}</strong>}
                    value={item.value}
                    
                />
            ))}
        </DataListRoot>
        <Link href="">Add Food</Link>

    </Stack>

  
 
   

    </Stack>
  );
}
