import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "../Components/Recipes/Sidebar/Sidebar";
import ProductGrid from "../Components/Recipes/ProductsGrid/ProductsGrid";
import { getRecipesFromAnUser } from "../Services/Api/getRecipesFromAnUser";
import "../Components/Recipes/recipes.css";
import { useAuth } from "../Context/AuthContext";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Recipes = () => {
  const [usersRecipes, setUsersRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({
    mainIngredient: "",
    time: 120,
    difficulty: 10,
    rating: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipesFromAnUser(userId);
        const shuffledArray = shuffleArray(fetchedRecipes);
        setUsersRecipes(shuffledArray);
        setFilteredRecipes(shuffledArray);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [userId]);

  useEffect(() => {
    if (usersRecipes.length === 0) return;

    const applyFilters = () => {
      let updatedRecipes = [...usersRecipes];

      if (filters.mainIngredient) {
        updatedRecipes = updatedRecipes.filter(
          (recipe) => recipe.mainIngredient === filters.mainIngredient
        );
      }

      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.time <= filters.time
      );

      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.difficulty <= filters.difficulty
      );

      if (filters.rating.length > 0) {
        updatedRecipes = updatedRecipes.filter((recipe) =>
          filters.rating.includes(recipe.rating)
        );
      }

      setFilteredRecipes(updatedRecipes);
    };

    applyFilters();
  }, [filters, usersRecipes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mm-recipes-section">
      <Flex direction={{ base: "column", md: "row" }} minH="80vh">
        <Box
          mb={4}
          p={4}
          position={isMobile ? "relative" : "sticky"}
          top="0"
          alignSelf={isMobile ? undefined : "start"}
          h="fit-content"
          w={isMobile ? undefined : "300px"}
        >
          <Sidebar filters={filters} setFilters={setFilters} />
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={6}>
            Recipes
          </Heading>

          {filteredRecipes.length === 0 ? (
            <p>Recipes not found</p>
          ) : (
            <ProductGrid usersRecipes={filteredRecipes} />
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default Recipes;
