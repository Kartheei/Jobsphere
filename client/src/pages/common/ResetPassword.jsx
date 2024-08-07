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
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleConfShowClick = () => setShowConfPassword(!showConfPassword);

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

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // API call from authService for reset password
      const response = await resetPassword(formData);
    
      if (response) {
        toast({
          title: "Password updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/auth/signin");
      }
    } catch (error) {
      toast({
        title: "Password updation failed.",
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
            <Heading>Reset Password</Heading>
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
                    <CFaLock color="white" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Set new password."
                    onChange={handleChange}
                    value={formData.newPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="white">
                    <CFaLock color="white" />
                  </InputLeftElement>
                  <Input
                    type={showConfPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm new password."
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleConfShowClick}>
                      {showConfPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
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
                Reset Password
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

export default ResetPassword;
