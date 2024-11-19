import React, { useState, useEffect } from "react";
import { generateWeeklyMenu } from "../Services/Api/generateWeeklyMenu";
import { getOneRecipe } from "../Services/Api/getOneRecipe";
import { NavLink } from "react-router-dom";
import { Grid, Badge, Box, Stack, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalBody, Spinner } from "@chakra-ui/react";
import { getColorBadge } from "../Data/recipeBagdeColor";
import jsPDF from "jspdf";
import "jspdf-autotable";

const WeeklyMenu = () => {
  const userId = localStorage.getItem("id");
  const [weekMenu, setWeekMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleWeeklyMenu();
  }, []);

  const handleWeeklyMenu = async () => {
    try {
      setLoading(true);
      const recipes = await generateWeeklyMenu(userId);
      setWeekMenu(recipes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Weekly Menu`, 14, 22);

    const pdfData = weekMenu.map((recipe) => ({
      Title: recipe.title,
      Description: recipe.description,
      MainIngredient: recipe.mainIngredient,
      Ingredients: recipe.ingredients
        .map(
          (ingredient) =>
            `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
        )
        .join(", "),
      Time: `${recipe.time} min`,
    }));

    doc.autoTable({
      head: [
        [
          {
            content: "Title",
            styles: {
              fillColor: "green",
              textColor: "white",
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "Description",
            styles: {
              fillColor: "green",
              textColor: "white",
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "Main Ingredient",
            styles: {
              fillColor: "green",
              textColor: "white",
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "Ingredients",
            styles: {
              fillColor: "green",
              textColor: "white",
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "Time",
            styles: {
              fillColor: "green",
              textColor: "white",
              halign: "center",
              valign: "middle",
            },
          },
        ],
      ],
      body: pdfData.map((item) => [
        item.Title,
        item.Description,
        item.MainIngredient,
        item.Ingredients,
        item.Time,
      ]),
      startY: 30,
    });

    doc.save(`weekly_menu_recipes.pdf`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <div>
          <Modal isOpen={loading} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent bg="transparent" boxShadow="none">
              <ModalBody
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size="xl" color="green.400" borderWidth="4px" />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}

      {!loading && weekMenu.length > 0 && (
        <>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            p={4}
            gap={6}
          >
            {weekMenu.map((recipe) => (
              <NavLink to={`/recipe/${recipe._id}`} key={recipe._id}>
                <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="lg">
                  <Image
                    src={recipe.picture}
                    alt={recipe.title}
                    w={300}
                    objectFit="fill"
                  />
                  <Badge
                    bgColor={getColorBadge(recipe.mainIngredient).bgColor}
                    color={getColorBadge(recipe.mainIngredient).color}
                  >
                    {recipe.mainIngredient}
                  </Badge>
                  <Stack mt={2}>
                    <Text fontWeight="bold">{recipe.title}</Text>
                  </Stack>
                </Box>
              </NavLink>
            ))}
          </Grid>
          <Button
            colorScheme="green"
            onClick={handleGeneratePDF}
            mb={4}
            w="300px"
          >
            Download Menu In Pdf
          </Button>
        </>
      )}

      {!loading && weekMenu.length === 0 && (
        <p>No recipes found. Please try generating the weekly menu again.</p>
      )}
    </div>
  );
};

export default WeeklyMenu;
