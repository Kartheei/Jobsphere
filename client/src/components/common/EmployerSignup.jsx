import { useState } from "react";

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
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { registerEmployer } from "../../services/authService"; // Import the service

const EmployerSignup = ({ handleToggle, isCandidate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    orgName: "",
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
      // API call for register employer from authService to save data.
      const response = await registerEmployer(formData);

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
          src="/images/registration1.webp"
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image src="/images/logo_scale.webp" boxSize="80px" />
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Stack direction="row" spacing={4} align="center" justify="center">
            <Button
              colorScheme="gray"
              onClick={() => handleToggle(true)}
              isDisabled={isCandidate}
              cursor={isCandidate ? "not-allowed" : "pointer"}
            >
              Candidate
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => handleToggle(false)}
              isDisabled={!isCandidate}
              cursor={!isCandidate ? "not-allowed" : "pointer"}
            >
              Employer
            </Button>
          </Stack>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} mt={10}>
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
                  <FormControl id="orgName" isRequired>
                    <FormLabel>Organization Name</FormLabel>
                    <Input
                      type="text"
                      value={formData.orgName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <HStack>
                    <Box>
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
                              p={0}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} strokeWidth={1} />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box>
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
                              p={0}
                              onClick={() =>
                                setShowCnfPassword((prev) => !prev)
                              }
                            >
                              {showCnfPassword ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} strokeWidth={1} />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Box>
                  </HStack>

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

EmployerSignup.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  isCandidate: PropTypes.bool.isRequired,
};

export default EmployerSignup;
