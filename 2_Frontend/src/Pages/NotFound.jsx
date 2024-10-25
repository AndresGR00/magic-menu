import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        backgroundClip="text"
        color="green.600"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Link to="/">
        <Button
          colorScheme="green"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
