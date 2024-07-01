import {
  Box,
  Container,
  Flex,
  Heading,
  ChakraProvider,
  Text,
  VStack,
  CSSReset,
  Image,
  Input,
} from "@chakra-ui/react";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";

function Profile() {
  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Container maxW="container.xl" mt="8">
        <Box className="cover-image" mb="4">
          <Heading size="xl">Cover Image</Heading>
          <Text>Quote</Text>
        </Box>
        <Flex alignItems="center" mb="8">
          <Box className="profile-picture" mr="4">
            <Image
              src="./images/profile.png"
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
            />
          </Box>
          <Input placeholder="JOHN DOE" size="lg" className="input-field" />
        </Flex>
        <VStack align="start" spacing="6" mt="8">
          <Box className="section">
            <Heading size="md" mb="4">
              About
            </Heading>
            <Box className="content-placeholder" />
          </Box>
          <Box className="section">
            <Heading size="md" mb="4">
              Experience
            </Heading>
            <Box className="content-placeholder" />
          </Box>
          <Box className="section">
            <Heading size="md" mb="4">
              Education
            </Heading>
            <Box className="content-placeholder" />
          </Box>
        </VStack>
      </Container>

      <Footer />
    </ChakraProvider>
  );
}

export default Profile;
