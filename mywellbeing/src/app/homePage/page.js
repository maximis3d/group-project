"use client";
import { Box, HStack, Stack, Text, Input } from "@chakra-ui/react";
import { StatRoot, StatValueText, StatHelpText } from "@/components/ui/stat";
import { ProgressRoot, ProgressBar } from "@/components/ui/progress";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

// Reusable NutrientStat Component
const NutrientStat = ({ title, total, goal }) => {
  const calculateProgress = (total, goal) => {
    if (!goal) return 0;
    return Math.min((total / goal) * 100, 100);
  };

  return (
    <Box
      style={{
        padding: "15px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "500px",
        marginTop: "10px",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        border: "2px solid teal",
      }}
    >
      <StatRoot maxW="240px" display="flex" flexDirection="column" alignItems="center">
        <div style={{ display: "flex", flexDirection: "column", marginTop: "25px" }}>
          <span style={{ fontSize: "20px", color: "#0e8d78", fontWeight: "bold" }}>
            {title}
          </span>
          <div style={{ display: "flex", alignItems: "baseline", marginTop: "2px" }}>
            <StatValueText
              value={total}
              color="teal.600"
              fontSize="18px"
              formatOptions={{ style: "decimal", maximumFractionDigits: 0 }}
            />
            <span style={{ fontSize: "16px", color: "grey", marginLeft: "4px" }}>
              out of {goal.toFixed()}
            </span>
          </div>
        </div>
        <StatHelpText color="gray.500" mb="2">
          {((total / goal) * 100).toFixed()}% achieved
        </StatHelpText>
        <ProgressRoot width="240px" maxWidth="300px" value={calculateProgress(total, goal)}>
          <ProgressBar />
        </ProgressRoot>
      </StatRoot>
    </Box>
  );
};

const HomePage = () => {
  const [dailyNutritionData, setNutritionData] = useState({
    protein: { total: 0, goal: 100 },
    tee: { total: 0, goal: 3000 },
    carbs: { total: 0, goal: 2500 },
    fat: { total: 0, goal: 70 },
  });
  const [weeklyNutritionData, setWeeklyNutritionData] = useState({
    protein: { total: 0 },
    tee: { total: 0 },
    carbs: { total: 0 },
    fat: { total: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Get today's date and format it to YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today); // Set default to today

  // Helper to format start and end of day
  const getDateRange = (date) => {
    const start = `${date}T00:00:00.000Z`;
    const end = `${date}T23:59:59.999Z`;
    return { start, end };
  };

  // Helper to calculate the last 7 days
  const getLast7Days = (date) => {
    const dates = [];
    let currentDate = new Date(date);
    for (let i = 0; i < 7; i++) {
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return dates.reverse(); // Return in chronological order
  };

  const { start, end } = getDateRange(selectedDate);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userResponse = await axios.get("http://localhost:5000/user", { withCredentials: true });
        const userData = userResponse.data;

        const teeGoal = userData.tee || 3000;
        const proteinGoal = userData.protein || 100;
        const carbsGoal = userData.carbs || 2500;
        const fatGoal = userData.fat || 70;

        setNutritionData((prevState) => ({
          ...prevState,
          tee: { ...prevState.tee, goal: teeGoal },
          protein: { ...prevState.protein, goal: proteinGoal },
          carbs: { ...prevState.carbs, goal: carbsGoal },
          fat: { ...prevState.fat, goal: fatGoal },
        }));

        // Fetch data for the selected date (daily data)
        const dailyFoodResponse = await axios.get("http://localhost:5000/get-saved-foods", {
          params: { start, end },
          withCredentials: true,
        });
        const dailyFoods = dailyFoodResponse.data;

        const totaldailyCalories = dailyFoods.reduce((sum, food) => sum + (food.calories || 0), 0);
        const totaldailyProtein = dailyFoods.reduce((sum, food) => sum + (food.protein || 0), 0);
        const totaldailyCarbs = dailyFoods.reduce((sum, food) => sum + (food.carbs || 0), 0);
        const totaldailyFat = dailyFoods.reduce((sum, food) => sum + (food.fat || 0), 0);

        setNutritionData((prevState) => ({
          ...prevState,
          tee: { ...prevState.tee, total: totaldailyCalories },
          protein: { ...prevState.protein, total: totaldailyProtein },
          carbs: { ...prevState.carbs, total: totaldailyCarbs },
          fat: { ...prevState.fat, total: totaldailyFat },
        }));

        // Fetch data for the previous 7 days (weekly data)
        const last7Days = getLast7Days(selectedDate);
        let weeklyData = {
          protein: 0,
          tee: 0,
          carbs: 0,
          fat: 0,
        };

        for (const date of last7Days) {
          const { start, end } = getDateRange(date);
          const foodResponse = await axios.get("http://localhost:5000/get-saved-foods", {
            params: { start, end },
            withCredentials: true,
          });

          const totalCalories = foodResponse.data.reduce((sum, food) => sum + (food.calories || 0), 0);
          const totalProtein = foodResponse.data.reduce((sum, food) => sum + (food.protein || 0), 0);
          const totalCarbs = foodResponse.data.reduce((sum, food) => sum + (food.carbs || 0), 0);
          const totalFat = foodResponse.data.reduce((sum, food) => sum + (food.fat || 0), 0);

          weeklyData.tee += totalCalories;
          weeklyData.protein += totalProtein;
          weeklyData.carbs += totalCarbs;
          weeklyData.fat += totalFat;
        }

        setWeeklyNutritionData({
          protein: { total: weeklyData.protein },
          tee: { total: weeklyData.tee },
          carbs: { total: weeklyData.carbs },
          fat: { total: weeklyData.fat },
        });

      } catch (error) {
        console.error("Error fetching user or food data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [start, end, selectedDate]); // Re-fetch when start, end, or selectedDate changes

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={4} direction="column" align="center" mt="5px" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <NavBar />
      <h1 style={{ fontWeight: "bold", fontSize: "24px", marginTop: "20px", marginBottom: "0px" }}>
        {selectedDate} Breakdown
      </h1>
      <Box width="400px" height="2px" backgroundColor="teal" marginTop="5px 0" />
      <Box width="400px" height="2px" backgroundColor="teal" marginTop="0px 0" />

      <Box mt="20px" mb="30px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Text fontSize="18px" fontWeight="bold" textAlign="center">Select Date:</Text>
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          width="200px"
          marginTop="10px"
          textAlign="center"
        />
      </Box>

      <Box className="bodyContainer" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" width="100%" textAlign="center" mt="40px">
        <Text fontWeight="bold" fontSize="24px" mt="20px">Daily Breakdown</Text>
        <HStack spacing={4} className="bottomContainer" align="flex-start" width="100%" textAlign="center" justify="center" wrap="wrap">
          <NutrientStat title="Calories" total={dailyNutritionData.tee.total} goal={dailyNutritionData.tee.goal} />
          <NutrientStat title="Protein" total={dailyNutritionData.protein.total} goal={dailyNutritionData.protein.goal} />
          <NutrientStat title="Carbs" total={dailyNutritionData.carbs.total} goal={dailyNutritionData.carbs.goal} />
          <NutrientStat title="Fat" total={dailyNutritionData.fat.total} goal={dailyNutritionData.fat.goal} />
        </HStack>

        <Text fontWeight="bold" fontSize="24px" mt="20px">Weekly Breakdown (Last 7 Days)</Text>
        <HStack spacing={4} className="bottomContainer" align="flex-start" width="100%" textAlign="center" justify="center" wrap="wrap">
          <NutrientStat title="Calories" total={weeklyNutritionData.tee.total} goal={dailyNutritionData.tee.goal * 7} />
          <NutrientStat title="Protein" total={weeklyNutritionData.protein.total} goal={dailyNutritionData.protein.goal * 7} />
          <NutrientStat title="Carbs" total={weeklyNutritionData.carbs.total} goal={dailyNutritionData.carbs.goal * 7} />
          <NutrientStat title="Fat" total={weeklyNutritionData.fat.total} goal={dailyNutritionData.fat.goal * 7} />
        </HStack>
      </Box>
    </Stack>
  );
};

export default HomePage;
