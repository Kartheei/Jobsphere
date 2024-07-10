"use client";
import { useState } from "react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  HStack,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { registerCandidate } from "../../services/authService"; // Import the service

const CandidateSignup = ({ handleToggle, isCandidate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // API call for register candidate from authService to save data.
      const response = await registerCandidate(formData);

      if (response) {
        toast({
          title: "Registration successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/auth/signin");
      }
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src="../images/registration.jpg"
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image src="../images/logo_scale.png" boxSize="80px" />
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>

          <Stack direction="row" spacing={4} align="center" justify="center">
            <Button
              colorScheme="blue"
              onClick={() => handleToggle(true)}
              isDisabled={isCandidate}
              cursor={isCandidate ? "not-allowed" : "pointer"}
            >
              Candidate
            </Button>
            <Button
              colorScheme="gray"
              onClick={() => handleToggle(false)}
              isDisabled={!isCandidate}
              cursor={!isCandidate ? "not-allowed" : "pointer"}
            >
              Employer
            </Button>
          </Stack>

          <Stack spacing={8} mx={"auto"} maxW={"lg"} mt={4}>
            <Box>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
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
                  </FormControl>
                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showCnfPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() => setShowCnfPassword((prev) => !prev)}
                        >
                          {showCnfPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link
                        color={"blue.400"}
                        as={RouterLink}
                        to="/auth/signin"
                      >
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

CandidateSignup.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  isCandidate: PropTypes.bool.isRequired,
};

export default CandidateSignup;
