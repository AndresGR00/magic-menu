import React from "react";
import { Box, Button, useBreakpointValue, Heading } from "@chakra-ui/react";
import { generateRandomRecipe } from "../Services/Api/generateRandomRecipe";
import { useNavigate } from "react-router-dom";

const Generator = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  const handleGenerateRecipe = async () => {
    try {
      const randomId = await generateRandomRecipe(userId);
      if (randomId) {
        navigate(`/recipe/${randomId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWeeklyMenu = () => {
    navigate("/weekly-menu");
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
          Generate a recipe or a complete weekly menu.
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
          onClick={handleGenerateRecipe}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          One Recipe
        </Button>
        <Button
          onClick={handleWeeklyMenu}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          Weekly Menu
        </Button>
      </Box>
    </div>
  );
};

export default Generator;
