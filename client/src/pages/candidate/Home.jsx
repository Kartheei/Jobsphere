import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  CSSReset,
  Input,
  Text,
} from "@chakra-ui/react";
import "../../assets/styles/canHome.css";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";

function Home() {
  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Box className="hero-section">
        <Container maxW="container.md">
          <Box className="hero-content">
            <Heading as="h2" size="3xl" mb="10" className="hero-heading">
              Find the most exciting jobs
            </Heading>
            <Flex mb="4" className="search-container">
              <Input
                placeholder="Job Title and Keyword"
                mr="2"
                bg="white"
                className="search-input"
              />
              <Input
                placeholder="Location"
                mr="2"
                bg="white"
                className="search-input"
              />
              <Button className="search-button">Search</Button>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="16">
        <Heading as="h3" size="xl" mb="8" textAlign="center">
          Get Your Job
        </Heading>
        <VStack spacing="8" align="stretch">
          <Box className="job-card">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h4" size="md" mb="2">
                  Software Engineer
                </Heading>
                <Text fontWeight="bold">Tech Innovators Inc.</Text>
                <Text mb="4">
                  Seeking a skilled software engineer with 3+ years of
                  experience in JavaScript, Python, and cloud computing.
                  Responsibilities include developing scalable web applications
                  and collaborating with cross-functional teams.
                </Text>
              </Box>
              <Button className="apply-button" width="120px">
                Apply
              </Button>
            </Flex>
          </Box>
          <Box className="job-card">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h4" size="md" mb="2">
                  Software Engineer
                </Heading>
                <Text fontWeight="bold">Tech Innovators Inc.</Text>
                <Text mb="4">
                  Seeking a skilled software engineer with 3+ years of
                  experience in JavaScript, Python, and cloud computing.
                  Responsibilities include developing scalable web applications
                  and collaborating with cross-functional teams.
                </Text>
              </Box>
              <Button className="apply-button" width="120px">
                Apply
              </Button>
            </Flex>
          </Box>
        </VStack>
      </Container>

      <Footer />
    </ChakraProvider>
  );
}

export default Home;
