import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { createRecipe } from "../Services/Api/postNewRecipe";
import { useNavigate } from "react-router-dom";
import { getPictureUrl } from "../utils/getPictureUrl";
import { errorMessagesInNewRecipeForm } from '../utils/errorsMessagesInForms'

const CreateNewRecipe = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');


  const mainIngredient = watch("mainIngredient");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        title: data.title,
        description: data.description,
        mainIngredient: data.mainIngredient,
        ingredients: data.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity ? parseFloat(ingredient.quantity) : 0,
          unit: ingredient.unit || "",
        })),
        picture: getPictureUrl(data.mainIngredient),
        rating: data.rating ? parseFloat(data.rating) : 0,
        difficulty: data.difficulty ? parseInt(data.difficulty, 10) : 1,
        time: data.time ? parseInt(data.time, 10) : 0,
        tags: data.tags.split(",").map((tag) => tag.trim().toString()),
        createdBy: userId,
      };

      const newRecipe = await createRecipe(formattedData);
      const recipeId = newRecipe._id;
      alert("Recipe created successfully!");
      navigate(`/recipe/${recipeId}`);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex display={"flex"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create a New Recipe
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            And have all your recipes in one place!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          width={{ base: "100%", md: "600px", lg: "800px" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="title" isRequired isInvalid={errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  {...register("title", { required: errorMessagesInNewRecipeForm.required })}
                />
                {errors.title && (
                  <Text color="red.500">{errors.title.message}</Text>
                )}
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Write a brief description of the recipe"
                  {...register("description", { required: errorMessagesInNewRecipeForm.required })}
                />
                {errors.description && (
                  <Text color="red.500">{errors.description.message}</Text>
                )}
              </FormControl>

              <FormControl id="mainIngredient" isRequired isInvalid={errors.mainIngredient}>
                <FormLabel>Main Ingredient</FormLabel>
                <Select
                  placeholder="Select main ingredient"
                  {...register("mainIngredient", {
                    required: errorMessagesInNewRecipeForm.required,
                  })}
                >
                  <option value="meat">Meat</option>
                  <option value="fish">Fish</option>
                  <option value="pasta">Pasta</option>
                  <option value="legume">Legume</option>
                  <option value="cereal">Cereal</option>
                  <option value="fruit">Fruit</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="mushroom">Mushroom</option>
                  <option value="egg">Egg</option>
                  <option value="nut">Nut</option>
                  <option value="seed">Seed</option>
                  <option value="diary">Diary</option>
                </Select>
                {errors.mainIngredient && (
                  <Text color="red.500">{errors.mainIngredient.message}</Text>
                )}
              </FormControl>

              <FormControl id="ingredients" isInvalid={errors.ingredients}>
                <FormLabel>Ingredients</FormLabel>
                {fields.map((field, index) => (
                  <Stack key={field.id} display="flex" flexDirection="row" flexWrap="wrap" align="center">
                    <Input
                      placeholder="Ingredient name"
                      {...register(`ingredients.${index}.name`, {
                        required: errorMessagesInNewRecipeForm.required,
                      })}
                    />
                    {errors.ingredients && errors.ingredients[index]?.name && (
                      <Text color="red.500">{errors.ingredients[index].name.message}</Text>
                    )}
                    <Input
                      placeholder="Quantity"
                      type="number"
                      {...register(`ingredients.${index}.quantity`, {
                        required: errorMessagesInNewRecipeForm.required,
                      })}
                    />
                    {errors.ingredients && errors.ingredients[index]?.quantity && (
                      <Text color="red.500">{errors.ingredients[index].quantity.message}</Text>
                    )}
                    <Select
                      placeholder="Unit"
                      {...register(`ingredients.${index}.unit`, {
                        required: errorMessagesInNewRecipeForm.required,
                      })}
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="mg">mg</option>
                      <option value="l">l</option>
                      <option value="dl">dl</option>
                      <option value="cl">cl</option>
                      <option value="ml">ml</option>
                    </Select>
                    <Button type="button" marginBottom={2} onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Stack>
                ))}
                {fields.length === 0 && (
                  <Text color="red.500">{errorMessagesInNewRecipeForm.atLeastOneIngredient}</Text>
                )}
                <Button
                  type="button"
                  onClick={() => append({ name: "", quantity: 0, unit: "" })}
                >
                  Add Ingredient
                </Button>
              </FormControl>

              <FormControl id="rating" isRequired isInvalid={errors.rating}>
                <FormLabel>Rating (1-5)</FormLabel>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  {...register("rating", { 
                    required: errorMessagesInNewRecipeForm.required,
                    validate: {
                      validRange: value => (value >= 1 && value <= 5) || "Rating must be between 1 and 5."
                    }
                  })}
                />
                {errors.rating && (
                  <Text color="red.500">{errors.rating.message}</Text>
                )}
              </FormControl>

              <FormControl id="difficulty" isRequired isInvalid={errors.difficulty}>
                <FormLabel>Difficulty (1-10)</FormLabel>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  {...register("difficulty", { 
                    required: errorMessagesInNewRecipeForm.required,
                    validate: {
                      validRange: value => (value >= 1 && value <= 10) || "Difficulty must be between 1 and 10."
                    }
                  })}
                />
                {errors.difficulty && (
                  <Text color="red.500">{errors.difficulty.message}</Text>
                )}
              </FormControl>

              <FormControl id="time" isRequired isInvalid={errors.time}>
                <FormLabel>Time (in minutes - multiple of 5)</FormLabel>
                <Input
                  type="number"
                  {...register("time", {
                    required: errorMessagesInNewRecipeForm.required,
                    validate: value => value % 5 === 0 || errorMessagesInNewRecipeForm.timeMultipleOfFive,
                  })}
                />
                {errors.time && (
                  <Text color="red.500">{errors.time.message}</Text>
                )}
              </FormControl>

              <FormControl id="tags" isRequired>
                <FormLabel>Tags</FormLabel>
                <Input
                  type="text"
                  placeholder="e.g., vegetarian, easy"
                  {...register("tags", { required: errorMessagesInNewRecipeForm.required })}
                />
                <Text fontSize="sm" color="gray.500">
                  Separate tags with commas.
                </Text>
                {errors.tags && (
                  <Text color="red.500">{errors.tags.message}</Text>
                )}
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"green.400"}
                  color={"white"}
                  _hover={{ bg: "green.500" }}
                  type="submit"
                  isLoading={loading}
                >
                  Create Recipe
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateNewRecipe;
