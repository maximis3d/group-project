// mywellbeing/src/components/NavBar.js
import { Link, HStack, Text, Box } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <>
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
    </>
  );
};

export default NavBar;