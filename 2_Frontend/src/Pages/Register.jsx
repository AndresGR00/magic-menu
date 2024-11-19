import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerAnUser } from "../Services/Api/registerAnUser";
import { errorsMessagesInRegisterForm } from "../utils/errorsMessagesInForms";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { loginUser } from "../Services/Api/loginUser";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await registerAnUser(data);
    
    if (response._id) {
      const loginResponse = await loginUser({
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("id", loginResponse.user._id);
      login(loginResponse.user._id);
      setIsLoading(false)
      toast({
        title: "User Registered!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/first-steps");
    } else {
      toast({
        title: "Registration failed.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="mm-register-container">
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create a new account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired isInvalid={errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    {...register("name", {
                      required: errorsMessagesInRegisterForm.required,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="email" isRequired isInvalid={errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: errorsMessagesInRegisterForm.required,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: errorsMessagesInRegisterForm.invalidEmail,
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="password" isRequired isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: errorsMessagesInRegisterForm.required,
                        minLength: {
                          value: 6,
                          message: errorsMessagesInRegisterForm.minLength,
                        },
                      })}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner size="lg" borderWidth="4px" /> : "Register"}
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link color={"green.400"} href="/login">Log In</Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Register;
