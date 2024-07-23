import { useEffect, useState } from "react";

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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/canHome.css";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { fetchRandomJobs } from "../../services/jobService";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchRandomJobs();
        if (jobsData.length === 0) {
          setError("No jobs available at the moment.");
        } else {
          setJobs(jobsData);
        }
      } catch (error) {
        setError(error.message);
        toast({
          title: "Error.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, [toast]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleViewClick = (jobId) => {
    navigate(`/jobs/jobDetails/${jobId}`);
  };

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
        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text fontSize="xl" color="red.500" textAlign="center">
            {error}
          </Text>
        ) : (
          <VStack spacing="8" align="stretch">
            {jobs.map((job) => (
              <Box key={job._id} className="job-card">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Heading as="h4" size="md" mb="2">
                      {job.title}
                    </Heading>
                    <Text fontWeight="bold">{job.location}</Text>
                    <Text maxWidth="1048px">
                      {truncateText(job.description, 50)}
                    </Text>
                  </Box>
                  <Button
                    className="apply-button"
                    onClick={() => handleViewClick(job._id)}
                  >
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </Container>

      <Footer contentType="candidate" />
    </ChakraProvider>
  );
}

export default Home;
