import { useState, useContext, useCallback, lazy, Suspense } from "react";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Image,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRound, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = async (formData) => {
    try {
      // API call from authService to allow user to login
      const response = await loginUser(formData);

      if (response) {
        toast({
          title: "Login successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        login(response.user); // Update the context state
        navigate(response.user.role === "Candidate" ? "/" : "/employer");
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgGradient="linear-gradient(90deg, rgba(0, 0, 50, 1) 0%, rgba(0, 50, 150, 1) 100%)"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          minW={{ base: "90%", md: "468px" }}
          backgroundColor="rgba(255, 255, 255, 0.15)"
          boxShadow="md"
          p="2rem"
          borderRadius={10}
        >
          <Stack align={"center"} mb={10}>
            <Image src="../images/logo_scale.webp" boxSize="80px" />
            <Heading>Login to JobSphere</Heading>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={7}>
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <UserRound color="white" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    {...register("email")}
                  />
                </InputGroup>
                {errors.email && <p>{errors.email.message}</p>}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="white">
                    <Lock color="white" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <p>{errors.password.message}</p>}
                <FormHelperText textAlign="right">
                  <Link
                    color="white"
                    as={RouterLink}
                    to="/auth/forgot-password"
                  >
                    forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>

              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                bgColor="#3182ce"
                width="full"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link as={RouterLink} to="/auth/signup" color="white">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Signin;
