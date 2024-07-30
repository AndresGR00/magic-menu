import React from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { loginUser } from "../Services/Api/loginUser";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await loginUser(data);
      alert("User Logged");
      localStorage.setItem("token", response.token);
      localStorage.setItem("userID", response.user._id);
    } catch (error) {
      console.log(error)
      setError("apiError", {
        type: "manual",
        message: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="mm-login-container">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <Text color="red.500" mt={2}>
                      {errors.email.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl id="password" isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <Text color="red.500" mt={2}>
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <Stack spacing={10} mt={4}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"green.600"}>Forgot password?</Text>
                  </Stack>
                  <Button
                    onSubmit={onSubmit}
                    type="submit"
                    bg={"green.600"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Login;
