"use client";
import { useState, useEffect } from "react";
import { Link, Button, HStack, Stack, Heading, Input, IconButton, Box, Spinner, Text } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { LuSearch } from "react-icons/lu";
import axios from "axios";

export default function AddFoodsPage() {
  // State variables for managing search query, results, loading, and errors
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedFoods, setSavedFoods] = useState([]);

  /**
   * Fetch saved food by user
   */
  const fetchSavedFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-saved-foods", {
        withCredentials: true,
      });
      setSavedFoods(response.data);
    } catch (error) {
      console.error("Error fetching saved foods:", error);
      alert(error.response.data)
    }
  }

  /**
   * Delete saved from the database
   * @param {String} foodId Id of food being deleted from the database  
   */
  const deleteSavedFood = async (foodId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-saved-food/${foodId}`, {
        withCredentials: true,
      });

      alert(response.data.message);

      setSavedFoods((prevFoods) => prevFoods.filter((food) => food._id !== foodId));
    } catch (error) {
      console.error("Error deleting saved food:", error);
      alert(error.response.data.message)
    }
  };

  useEffect(() => {
    fetchSavedFoods();
  }, []);


  /**
   * Search nutrionx api
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
    } catch (error) {
      console.error("Error saving food:", error);
  
      if (error.response) {
        // Server responded with a status code other than 2xx
        alert(error.response.data.message || "Failed to save the food item. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
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
      <HStack spacing={4} className="headerContainer" align="center">
        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Home</p>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Meals</p>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Health</p>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Goals</p>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Account</p>
        </Link>
        <Link href="/addFoods" mt="10px" color="teal">
          <p style={{ fontSize: "18px", padding: "0 8px" }}>Add Foods</p>
        </Link>
      </HStack>
      {/*****************************************End of header*****************************************/}

      <Stack gap="8" width="100%" maxW="600px" px="4">
        <Heading pt="20px">Add Foods</Heading>

        {/*****************************************Start of Search Section*****************************************/}
        <HStack spacing={4}>
          <Input
            placeholder="Food Name"
            width="300px"
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
            colorScheme="teal"
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

        <Link href="/addFoodDetails">
          <Button colorScheme="teal" variant="outline">
            Add Food
          </Button>
        </Link>
        <Heading pt="20px">Saved Foods</Heading>
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
          <Text>No saved foods found.</Text>
        )}


      </Stack>
    </Stack>
  );
}
