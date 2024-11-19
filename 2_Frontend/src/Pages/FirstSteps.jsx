import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDefaultRecipesToUser } from "../Services/Api/addDefaultRecipesToUser";

const FirstSteps = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const toast = useToast();

  const handleAddButton = async () => {
    setIsLoading(true);
    try {
      await addDefaultRecipesToUser(userId);
      toast({
        title: "Recipes added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/recipes");
    } catch (error) {
      toast({
        title: "Failed to add recipes.",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          isDisabled={isLoading}
        >
          Yes! Add
        </Button>
        <Button
          onClick={handlePassButton}
          colorScheme="red"
          width="280px"
          size="lg"
          isDisabled={isLoading}
        >
          Pass
        </Button>
      </Box>

      {isLoading && (
        <Modal isOpen={isLoading} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
            <ModalBody display="flex" justifyContent="center" alignItems="center">
              <Spinner size="xl" color="green.400" borderWidth="4px" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

    </div>
  );
};

export default FirstSteps;
