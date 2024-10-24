import React, { useState } from "react";
import {
  Box,
  Button,
  useBreakpointValue,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { getRecipesBulkTemplate } from "../Services/Api/getRecipesBulkTemplate";

const BulkRecipes = () => {
  const [file, setFile] = useState(null);
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const userId = localStorage.getItem('id');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownloadTemplate = () => {
    getRecipesBulkTemplate();
  };

  const handleUploadBulkRecipes = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      const response = await uploadBulkRecipes(file, userId);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Failed to upload the file");
      console.error(error);
    }
  };

  return (
    <div>
      <Box
        mb={4}
        maxW="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
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
          Choose your option.
        </Heading>
        <Box display="flex" flexDirection="column" p={5} gap={2} marginX="5" bgColor="green.100" rounded="lg" maxWidth="750px">
          <Text as="b">Explanation about the template:</Text>
          <Text>
            The mainIngredient field must be one of these: meat, fish, pasta,
            legume, cereal, fruit, vegetable, mushroom, egg, nut seed or diary.
          </Text>
          <Text>
            The ingredients must be separated by commas, and follow this format:
            quantity unit name. Example: 200g steak. Valid units are: kg, g, mg,
            l, dl, cl and ml.
          </Text>
          <Text>
            Rating is from 1 to 5. Difficulty is from 1 to 10. Time should be
            expressed in minutes and be a multiple of 5. Tags must be separated
            by commas.
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={flexDirection}
        width="100%"
        p={4}
        gap={12}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={handleDownloadTemplate}
          colorScheme="green"
          width="280px"
          size="lg"
        >
          Download Template
        </Button>

        <Box
          display="flex"
          flexDirection="column"
          width="280px"
          p={4}
          gap={4}
          alignItems="center"
          justifyContent="center"
        >
          <Input
            type="file"
            onChange={handleFileChange}
            colorScheme="green"
            width="280px"
            size="lg"
          />

          <Button
            onClick={handleUploadBulkRecipes}
            colorScheme="green"
            width="280px"
            size="lg"
          >
            Upload Your File
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default BulkRecipes;
