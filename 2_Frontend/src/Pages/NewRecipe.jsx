import React from "react";
import { Box, Button, useBreakpointValue, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const navigate = useNavigate();

  const handleCreateNewRecipe = () => {
    navigate(`/create-new-recipe`);
  };

  const handleBulkRecipes = () => {
    navigate("/bulk-recipes");
  };

  return (
    <div>
      <Box mb={4} maxW="100%">
        <Heading
          fontSize={{
            base: "xl",
            sm: "2xl",
            md: "3xl",
            lg: "4xl",
            xl: "5xl",
          }}
          textAlign={"center"}
          p={4}
        >
          Choose your option.
        </Heading>
      </Box>
      <Box
        display="flex"
        flexDirection={flexDirection}
        width="100%"
        p={4}
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={handleCreateNewRecipe}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          Create One Recipe
        </Button>
        <Button
          onClick={handleBulkRecipes}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          Bulk Recipes
        </Button>
      </Box>
    </div>
  );
};

export default NewRecipe;
