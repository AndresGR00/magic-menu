import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Text,
} from "@chakra-ui/react";
import './sidebar.css'

const Sidebar = ({ filters, setFilters }) => {
  const handleMainIngredientChange = (e) => {
    setFilters({ ...filters, mainIngredient: e.target.value });
  };

  const handleTimeChange = (value) => {
    setFilters({ ...filters, time: value });
  };

  const handleDifficultyChange = (value) => {
    setFilters({ ...filters, difficulty: value });
  };

  const handleRatingChange = (e) => {
    const { value, checked } = e.target;
    const updatedRatings = checked
      ? [...filters.rating, parseInt(value)]
      : filters.rating.filter((rating) => rating !== parseInt(value));
    setFilters({ ...filters, rating: updatedRatings });
  };

  const resetFilters = () => {
    setFilters({
      mainIngredient: "",
      time: 120,
      difficulty: 10,
      rating: [],
    });
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Filters
      </Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Main Ingredient</FormLabel>
          <Select
            value={filters.mainIngredient}
            placeholder="Select Main Ingredient"
            onChange={handleMainIngredientChange}
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
        </FormControl>

        <FormControl>
          <FormLabel>Time (minutes)</FormLabel>
          <Text textAlign="center">{filters.time} minutes</Text>
          <Slider
            value={filters.time}
            min={0}
            max={180}
            step={10}
            onChange={handleTimeChange}
            colorScheme='green'
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <div className="mm-sidebar-filters-time-range">
            <Text textAlign="center">0</Text>
            <Text textAlign="center">180</Text>
          </div>
        </FormControl>

        <FormControl>
          <FormLabel>Difficulty</FormLabel>
          <Text textAlign="center">{filters.difficulty}</Text>
          <Slider
            value={filters.difficulty}
            min={1}
            max={10}
            step={1}
            onChange={handleDifficultyChange}
            colorScheme='green'
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <div className="mm-sidebar-filters-difficulty-range">
            <Text textAlign="center">1</Text>
            <Text textAlign="center">10</Text>
          </div>
        </FormControl>

        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Checkbox
                key={rating}
                value={rating}
                onChange={handleRatingChange}
                isChecked={filters.rating.includes(rating)}
              >
                {rating} Stars
              </Checkbox>
            ))}
          </Stack>
        </FormControl>

        <Button colorScheme="green" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
