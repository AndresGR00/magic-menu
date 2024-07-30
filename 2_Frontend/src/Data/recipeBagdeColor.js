const RECIPE_BADGE_COLOR = [
  {
    name: "meat",
    bgColor: "red.500",
    color: "white",
    id: "1",
  },
  {
    name: "fish",
    bgColor: "blue.400",
    color: "white",
    id: "2",
  },
  {
    name: "pasta",
    bgColor: "orange.400",
    color: "white",
    id: "3",
  },
  {
    name: "legume",
    bgColor: "cyan.800",
    color: "white",
    id: "4",
  },
  {
    name: "cereal",
    bgColor: "pink.300",
    color: "white",
    id: "5",
  },
  {
    name: "fruit",
    bgColor: "purple.500",
    color: "white",
    id: "6",
  },
  {
    name: "vegetable",
    bgColor: "green.300",
    color: "white",
    id: "7",
  },
  {
    name: "mushroom",
    bgColor: "orange.900",
    color: "white",
    id: "8",
  },
  {
    name: "nut",
    bgColor: "gray.500",
    color: "white",
    id: "9",
  },
  {
    name: "seed",
    bgColor: "teal.100",
    color: "black",
    id: "10",
  },
  {
    name: "diary",
    bgColor: "gray.50",
    color: "black",
    id: "11",
  },
  {
    name: "egg",
    bgColor: "yellow.200",
    color: "black",
    id: "12",
  },
];

export const getColorBadge = (mainIngredient) => {
  const ingredient = RECIPE_BADGE_COLOR.find(
    (item) => item.name === mainIngredient
  );
  return ingredient
    ? { bgColor: ingredient.bgColor, color: ingredient.color }
    : { bgColor: "white", color: "black" };
};
