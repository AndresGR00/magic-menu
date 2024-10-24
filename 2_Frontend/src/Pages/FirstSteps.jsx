import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addDefaultRecipesToUser } from "../Services/Api/addDefaultRecipesToUser";

const FirstSteps = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  const handleAddButton = () => {
    addDefaultRecipesToUser(userId)
    alert("Recipes added!");
    navigate("/")
  }

  const handlePassButton = () => {
    navigate("/");
  };

  return (
    <div>
      <Box
        mb={4}
        maxW="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
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
          Do you want our recipes?
        </Heading>
        <Box
          display="flex"
          flexDirection="column"
          p={5}
          gap={2}
          marginX="5"
          bgColor="green.100"
          rounded="lg"
          maxWidth="750px"
        >
          <Text>
            It is a list of more than 100 recipes that you can add for free to
            your profile so you don't start with everything empty. And you're
            sure to discover one that you'll love!
          </Text>
          <Text as="i">This action may take a few minutes</Text>
        </Box>
      </Box>
      <Box
        display="flex"
        width="100%"
        p={4}
        gap={4}
        alignItems="center"
        justifyContent="center"
        flexDirection={flexDirection}
      >
        <Button
          onClick={handleAddButton}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          Yes! Add
        </Button>
        <Button
          onClick={handlePassButton}
          colorScheme="red"
          width="280px"
          size="lg"
        >
          Pass
        </Button>
      </Box>
    </div>
  );
};

export default FirstSteps;
