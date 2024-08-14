import { useState } from "react";

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
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { User } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call from authService for forgot password
      const response = await forgotPassword(email);

      if (response) {
        toast({
          title: "OTP sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/auth/verify-otp");
      }
    } catch (error) {
      toast({
        title: "Error sending OTP.",
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
            <Heading>Forgot your password?</Heading>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={7}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <User color="white" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Enter email address."
                    onChange={handleChange}
                    value={email}
                  />
                </InputGroup>
              </FormControl>

              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                bgColor="#3182ce"
                width="full"
                color="white"
                className="loginButton"
              >
                Send OTP
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        <Link as={RouterLink} to="/auth/signin" color="white">
          Go back to login
        </Link>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
