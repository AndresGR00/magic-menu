import React, { useEffect, useState } from "react";
import { getColorBadge } from "../Data/recipeBagdeColor";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneRecipe } from "../Services/Api/getOneRecipe";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [badgeBgColor, setBadgeBgColor] = useState("white");
  const [badgeColor, setBadgeColor] = useState("black");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getOneRecipe(id);
        setRecipe(data);
        const mainIngredient = data.mainIngredient;
        const item = getColorBadge(mainIngredient);
        setBadgeBgColor(item.bgColor);
        setBadgeColor(item.color);
      } catch (error) {
        setError(error);
        console.log("hola")
        navigate("..")
        navigate("/not-found")
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div className="mm-recipe-detail-container">
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={recipe.picture}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1}
                fontWeight={400}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                color="white"
              >
                {recipe.title}
              </Heading>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={"gray.200"}
                />
              }
            >
              <VStack spacing={{ base: 2, sm: 2 }} align="start">
                <Badge bgColor={badgeBgColor} color={badgeColor}>
                  {recipe.mainIngredient}
                </Badge>
                <Text fontSize={"lg"}>{recipe.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"green.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Ingredients
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {recipe.ingredients.map(({ name, quantity, unit, _id }) => (
                      <ListItem key={_id}>
                        {name} {quantity}
                        {unit}
                      </ListItem>
                    ))}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"green.500"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Recipe Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Rating:
                    </Text>{" "}
                    {recipe.rating}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Difficulty:
                    </Text>{" "}
                    {recipe.difficulty}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Time:
                    </Text>{" "}
                    {recipe.time} min
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Tags:
                    </Text>{" "}
                    {recipe.tags.join(", ")}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default RecipeDetail;
