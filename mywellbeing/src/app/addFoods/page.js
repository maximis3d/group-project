"use client";
import { useState, useEffect } from "react";
import { Link, Button, HStack, Stack, Heading, Input, IconButton, Box, Spinner, Text } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import NavBar from "@/components/NavBar";

export default function AddFoodsPage() {
  // State variables for managing search query, results, loading, and errors
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedFoods, setSavedFoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  /**
   * Get the start and end of a specific day for filtering purposes
   */
  const getDateRangeForSpecificDay = (date) => {
    const day = new Date(date);
    const startOfDay = new Date(day.setHours(0, 0, 0, 0)); // Start at 00:00:00
    const endOfDay = new Date(day.setHours(23, 59, 59, 999)); // End at 23:59:59
    return { start: startOfDay.toISOString(), end: endOfDay.toISOString() };
  };

  /**
   * Fetch saved foods with optional date filtering
   */
  const fetchSavedFoods = async () => {
    try {
      let start, end;

      // If a specific date is selected, use that date's range
      if (selectedDate) {
        const dateRange = getDateRangeForSpecificDay(selectedDate);
        start = dateRange.start;
        end = dateRange.end;
      } else {
        // Default to today if no date is selected
        const today = new Date();
        start = new Date(today.setHours(0, 0, 0, 0)).toISOString(); // Start of today
        end = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // End of today
      }

      const response = await axios.get("http://localhost:5000/get-saved-foods", {
        params: { start, end },
        withCredentials: true,
      });

      setSavedFoods(response.data);
    } catch (error) {
      console.error("Error fetching saved foods:", error);
      alert(error.response?.data?.message || "Failed to fetch saved foods");
    }
  };

  useEffect(() => {
    fetchSavedFoods();
  }, [selectedDate]); // Re-fetch whenever selectedDate changes

  /**
   * Search nutrition API
   * @returns None
   */
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a food item to search.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make a GET request to the backend API
      const response = await axios.get("/api/search", {
        params: { query },
      });

      // Access the 'results' array from the response
      setResults(response.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async (food) => {
    try {
      const {
        nf_calories = 0,
        nf_protein = 0,
        nf_total_fat = 0,
        nf_total_carbohydrate = 0,
      } = food.nutrients?.foods?.[0] || {};

      const body = {
        foodName: food.food_name || "Unknown Food",
        calories: nf_calories,
        protein: nf_protein,
        fat: nf_total_fat,
        carbs: nf_total_carbohydrate,
      };

      const response = await axios.post("http://localhost:5000/save-food", body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success response
      alert(response.data.message);
      fetchSavedFoods(); // Re-fetch saved foods after adding a new one
    } catch (error) {
      console.error("Error saving food:", error);

      if (error.response) {
        alert(error.response.data.message || "Failed to save the food item. Please try again.");
      } else if (error.request) {
        alert("No response from the server. Please try again.");
      } else {
        // Other errors
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      {/*****************************************Start of header*****************************************/}
      <NavBar />
      {/*****************************************End of header*****************************************/}

      <Stack gap="8" width="100%" maxW="600px" px="4">
        <Heading pt="20px" textAlign="center">Add Foods</Heading>

        {/*****************************************Start of Search Section*****************************************/}
        <HStack spacing={4} width="100%">
          <Input
            placeholder="Food Name"
            width="100%" // Set width to 100% to make it span the available width
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton
            aria-label="Search database"
            icon={<LuSearch />}
            onClick={handleSearch}
            isLoading={loading}
            size="lg"                  // Adjust the size of the button to match your design
          />
        </HStack>
        {/*****************************************End of Search Section*****************************************/}

        {/*****************************************Start of Results Section*****************************************/}
        {loading && <Spinner size="lg" color="teal.500" />}
        {error && <Text color="red.500">{error}</Text>}
        {!loading && !error && results.length > 0 && (
          <DataListRoot pt="20px" orientation={"horizontal"}>
            {results.map((item, index) => {
              const nutrients = item.nutrients?.foods?.[0] || {};
              return (
                <DataListItem
                  key={index}
                  label={<strong>{item.food_name || "Unknown Food"}</strong>}
                  value={`Calories: ${nutrients.nf_calories || "N/A"}, Protein: ${nutrients.nf_protein || "N/A"}, Fat: ${nutrients.nf_total_fat || "N/A"}, Carbs: ${nutrients.nf_total_carbohydrate || "N/A"}`}
                >
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => saveFood(item)}
                  >
                    Save
                  </Button>
                </DataListItem>
              );
            })}
          </DataListRoot>
        )}
        {!loading && !error && results.length === 0 && query && (
          <Text>No results found.</Text>
        )}
        {/*****************************************End of Results Section*****************************************/}

        {/* Add Food Button */}
        <Link href="/addFoodDetails">
          <Button
            color="black"         
            backgroundColor="white"
            variant="outline"      
            borderColor="black"    
            width="100%"
            mt="20px"              
          >
            Add Food
          </Button>
        </Link>


        {/*****************************************Start of Saved Foods Section*****************************************/}
        <Heading pt="20px" textAlign="center">Saved Foods</Heading>

        {/* Filter for saved foods by date */}
        <HStack spacing={4}>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            placeholder="Select Date"
          />
          <Button
            colorScheme="blue"
            onClick={fetchSavedFoods}
            mt="10px"
          >
            Filter Foods by Date
          </Button>
        </HStack>

        {/* Display saved foods */}
        {savedFoods.length > 0 ? (
          <DataListRoot>
            {savedFoods.map((food) => (
              <DataListItem
                key={food._id}
                label={<strong>{food.foodName}</strong>}
                value={`Calories: ${food.calories}, Protein: ${food.protein}, Fat: ${food.fat}, Carbs: ${food.carbs}`}
              >
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => deleteSavedFood(food._id)}
                >
                  Delete
                </Button>
              </DataListItem>
            ))}
          </DataListRoot>
        ) : (
          <Text>No saved foods found for the selected date.</Text>
        )}
        {/*****************************************End of Saved Foods Section*****************************************/}
      </Stack>
    </Stack>
  );
}
