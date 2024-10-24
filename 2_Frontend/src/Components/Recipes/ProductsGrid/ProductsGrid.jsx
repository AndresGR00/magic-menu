import React from "react";
import { Box, Grid, Image, Text, Stack, Badge } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { getColorBadge } from "../../../Data/recipeBagdeColor";

const truncateRecipeName = (name) => {
  if (name.length > 13) {
    return name.slice(0, 13) + "...";
  }
  return name;
};

const RecipeGrid = ({usersRecipes}) => {

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={6}
    >
      {usersRecipes.map((recipe) => (
        <NavLink to={`/recipe/${recipe._id}`} key={recipe._id}>
          <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="lg">
            <Image
              src={recipe.picture}
              alt={recipe.title}
              w={300}
              objectFit="fill"
            />
            <Badge bgColor={getColorBadge(recipe.mainIngredient).bgColor} color={getColorBadge(recipe.mainIngredient).color}>
              {recipe.mainIngredient}
            </Badge>
            <Stack mt={2}>
              <Text fontWeight="bold">{truncateRecipeName(recipe.title)}</Text>
            </Stack>
          </Box>
        </NavLink>
      ))}
    </Grid>
  );
};

export default RecipeGrid;
