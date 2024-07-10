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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../../assets/styles/canHome.css";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";
import { fetchAllJobs } from "../../services/authService";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchAllJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

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
        {loading ? (
          <Spinner />
        ) : (
          <VStack spacing="8" align="stretch">
            {jobs.length > 0 ? (
              jobs.slice(0, 2).map((job) => (
                <Box key={job._id} className="job-card" borderWidth="1px" borderRadius="lg" p={5}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      <Heading as="h4" size="md" mb="2">
                        {job.jobTitle}
                      </Heading>
                      <Text fontWeight="bold">{job.companyName}</Text>
                      <Text mb="4">{job.jobDescription}</Text>
                    </Box>
                    <Button className="apply-button" width="120px">
                      Apply
                    </Button>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No jobs available</Text>
            )}
          </VStack>
        )}
      </Container>

      <Footer />
    </ChakraProvider>
  );
}

export default Home;


