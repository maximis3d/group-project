"use client"
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { StatRoot, StatValueText, StatHelpText } from "@/components/ui/stat";
import { ProgressRoot, ProgressBar } from "@/components/ui/progress";
import axios from 'axios';
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [nutritionData, setNutritionData] = useState({
    protein: { total: 0, goal: 100 },
    calories: { total: 0, goal: 3000 },
    carbs: { total: 0, goal: 2500 },
    fat: { total: 0, goal: 70 },
  });

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/user", { withCredentials: true });
        const userData = userResponse.data;
        
        const calorieGoal = userData.calories || 3000;
        const proteinGoal = userData.protein || 100;
        const carbsGoal = userData.carbs || 100 
        const fatGoal = userData.fat || 100

        setNutritionData((prevState) => ({
          ...prevState,
          calories: { ...prevState.calories, goal: calorieGoal },
          protein: { ...prevState.protein, goal: proteinGoal },
          carbs: { ...prevState.carbs, goal: carbsGoal},
          fat: { ...prevState.fat, goal: fatGoal}
        }));


        // Fetch saved food data and calculate the total calories and protein
        const foodResponse = await axios.get("http://localhost:5000/get-saved-foods", { withCredentials: true });
        const foods = foodResponse.data;

        const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0);
        const totalProtein = foods.reduce((sum, food) => sum + (food.protein || 0), 0); 
        const totalCarbs = foods.reduce((sum, food) => sum + (food.carbs || 0), 0); 
        const totalFat = foods.reduce((sum, food) => sum + (food.fat || 0), 0); 

        // Update total calories and protein in state
        setNutritionData((prevState) => ({
          ...prevState,
          calories: { ...prevState.calories, total: totalCalories },
          protein: { ...prevState.protein, total: totalProtein },
          carbs: { ...prevState.carbs, total: totalCarbs },
          fat: { ...prevState.fat, total: totalFat },
        }));
      } catch (error) {
        console.error("Error fetching user or food data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/*****************************************Start of header*****************************************/}
      <NavBar />
      <h1 style={{ fontWeight: "bold", fontSize: "24px", marginTop: "20px", marginBottom: "0px" }}>Overall progress</h1>

      <Box width="400px" height="2px" backgroundColor="teal" marginTop="5px 0" />
      <Box width="400px" height="2px" backgroundColor="teal" marginTop="0px 0" />
      {/*****************************************End of header section*****************************************/}

      {/*****************************************Start of main body section*****************************************/}
      <Box className="bodyContainer" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" width="100%" textAlign="center" mt="40px">
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
            {/* Protein */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Protein</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
                  <StatValueText
                    value={nutritionData.protein.total}
                    color="teal.600"
                    fontSize="18px"
                    formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                  />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>
                    out of {nutritionData.protein.goal}
                  </span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">
                {((nutritionData.protein.total / nutritionData.protein.goal) * 100).toFixed(2)}% achieved
              </StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar
                  value={(nutritionData.protein.total / nutritionData.protein.goal) * 100} // Progress percentage for protein
                />
              </ProgressRoot>
            </StatRoot>

            {/* Calories */}
            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Calories</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText
                    value={nutritionData.calories.total}
                    color="teal.600"
                    fontSize="18px"
                    formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                  />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of {nutritionData.calories.goal}</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">
                {((nutritionData.calories.total / nutritionData.calories.goal) * 100).toFixed(2)}% achieved
              </StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar
                  value={(nutritionData.calories.total / nutritionData.calories.goal) * 100} // Progress percentage for calories
                />
              </ProgressRoot>
            </StatRoot>

            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Carbs</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText
                    value={nutritionData.carbs.total}
                    color="teal.600"
                    fontSize="18px"
                    formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                  />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of {nutritionData.carbs.goal}</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">
                {((nutritionData.carbs.total / nutritionData.carbs.goal) * 100).toFixed(2)}% achieved
              </StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar
                  value={(nutritionData.carbs.total / nutritionData.carbs.goal) * 100} // Progress percentage for carbs
                />
              </ProgressRoot>
            </StatRoot>

            <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                <span style={{ fontSize: '20px', color: '#0e8d78', fontWeight: 'bold' }}>Fat</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px' }}>
                  <StatValueText
                    value={nutritionData.fat.total}
                    color="teal.600"
                    fontSize="18px"
                    formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
                  />
                  <span style={{ fontSize: '16px', color: 'grey', marginLeft: '4px' }}>out of {nutritionData.fat.goal}</span>
                </div>
              </div>
              <StatHelpText color="gray.500" mb="2">
                {((nutritionData.fat.total / nutritionData.fat.goal) * 100).toFixed(2)}% achieved
              </StatHelpText>
              <ProgressRoot width="240px" maxWidth="300px">
                <ProgressBar
                  value={(nutritionData.fat.total / nutritionData.fat.goal) * 100} // Progress percentage for fat
                />
              </ProgressRoot>
            </StatRoot>

            {/* Other Nutrition Stats like Carbs, Fats can be added here */}
          </Box>
        </HStack>
      </Box>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}

export default HomePage;
