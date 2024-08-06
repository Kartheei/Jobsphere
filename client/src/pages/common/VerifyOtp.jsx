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
import { FaUserAlt, FaLock, FaKey } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/authService";

const CFaUserAlt = chakra(FaUserAlt);
const CFaKey = chakra(FaKey);

const VerifyOtp = () => {
  const [formData, setFormData] = useState({ email: "", otp: "" });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call from authService to verify OTP
      const response = await verifyOtp(formData);

      if (response) {
        toast({
          title: "OTP verified.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/auth/reset-password");
      }
    } catch (error) {
      toast({
        title: "Invalid or expired OTP.",
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
            <Heading>Verify OTP</Heading>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={7}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="white" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email address."
                    onChange={handleChange}
                    value={formData.email}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="white">
                    <CFaKey color="white" />
                  </InputLeftElement>
                  <Input 
                    type="text"
                    name="otp"
                    placeholder="Enter OTP."
                    onChange={handleChange}
                    value={formData.otp} />
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
                Verify
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

export default VerifyOtp;
