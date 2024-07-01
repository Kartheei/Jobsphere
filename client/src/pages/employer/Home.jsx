import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  CSSReset,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/empHome.css";
import NavBar from "../../components/employer/NavBar";
import Footer from "../../components/employer/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handlePostJobClick = () => {
    navigate("/employer/job-creation");
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Box className="emp-hero-section">
        <Container maxW="container.md">
          <Box className="emp-hero-content">
            <Heading as="h2" size="3xl" mb="10" className="emp-hero-heading">
              Create a job post here.
            </Heading>
            <Flex mb="4">
              {" "}
              {/* Center the button horizontally */}
              <Button
                className="post-job-button"
                size="lg"
                onClick={handlePostJobClick}
              >
                Post a Job
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="8" textAlign="center">
        <Flex justify="center" mb="8" flexWrap="wrap">
          <Box
            className="stat-box"
            mr="4"
            mb={{ base: "4", md: "0" }}
            bg="#2d3748"
            color="white"
          >
            <Heading as="h3" size="xl">
              28
            </Heading>
            <Text>Total job posts</Text>
          </Box>
          <Box className="stat-box" bg="#2d3748" color="white">
            <Heading as="h3" size="xl">
              28
            </Heading>
            <Text>Applications received</Text>
          </Box>
        </Flex>
        <Heading as="h3" size="xl" mb="8">
          Recent Jobs Post
        </Heading>
        <Box
          p="6"
          boxShadow="md"
          className="recent-jobs-box"
          borderRadius="md"
          bg="#F7FAFC"
        >
          <Flex justify="space-between" alignItems="center" flexWrap="wrap">
            <Box textAlign="left" flex="1" minW="250px">
              <Heading as="h4" size="md">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mt="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
            </Box>
            <Button mt={{ base: "4", md: "0" }} className="view-button">
              View
            </Button>
          </Flex>
        </Box>
      </Container>

      <Container maxW="container.xl" mt="16" textAlign="center">
        <Flex justify="space-between" flexWrap="wrap">
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box
              className="info-box"
              p="6"
              boxShadow="md"
              borderRadius="md"
              bg="#F7FAFC"
            >
              <Heading as="h4" size="lg">
                1
              </Heading>
              <Text fontWeight="bold">Create your free account</Text>
              <Text mt="4">
                To create create account with mail and start creating job post
              </Text>
            </Box>
          </Box>
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box
              className="info-box"
              p="6"
              boxShadow="md"
              borderRadius="md"
              bg="#F7FAFC"
            >
              <Heading as="h4" size="lg">
                2
              </Heading>
              <Text fontWeight="bold">Build your job post</Text>
              <Text mt="4">
                To create create account with mail and start creating job post
              </Text>
            </Box>
          </Box>
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box
              className="info-box"
              p="6"
              boxShadow="md"
              borderRadius="md"
              bg="#F7FAFC"
            >
              <Heading as="h4" size="lg">
                3
              </Heading>
              <Text fontWeight="bold">Post your job</Text>
              <Text mt="4">
                To create create account with mail and start creating job post
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </ChakraProvider>
  );
};

export default Home;
