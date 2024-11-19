import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Checkbox,
  FormErrorMessage,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../Services/Api/loginUser";
import { errorsMessagesInLoginForm } from "../utils/errorsMessagesInForms";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await loginUser(data);
    setIsLoading(false)
    if (response.token) {
      localStorage.setItem("token", response.token);
      login(response.user._id)
      toast({
        title: "Login successful!",
        description: "You have been logged in successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/")
    } else {
      toast({
        title: "Login failed.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="mm-login-container">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign in to your account
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
                <FormControl id="email" isRequired isInvalid={errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: errorsMessagesInLoginForm.required,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: errorsMessagesInLoginForm.invalidEmail,
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="password"
                  isRequired
                  isInvalid={errors.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: errorsMessagesInLoginForm.required,
                        minLength: {
                          value: 6,
                          message: errorsMessagesInLoginForm.minLength,
                        },
                      })}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
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
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"green.400"}>Forgot password?</Text>
                  </Stack>
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
                    {isLoading ? <Spinner size="lg" borderWidth="4px" /> : "Sign in"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Login;
