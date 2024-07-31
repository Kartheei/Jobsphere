import { useEffect, useState } from "react";

import {
  ChakraProvider,
  CSSReset,
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { fetchJobs, searchJobs } from "../../services/jobService";

function JobDisplay() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const title = searchParams.get("title") || "";
        const locationParam = searchParams.get("location") || "";

        let jobsData;
        if (title || locationParam) {
          jobsData = await searchJobs(title, locationParam);
        } else {
          jobsData = await fetchJobs();
        }

        setJobs(jobsData);
      } catch (error) {
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
  }, [location.search, toast]);

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
      <Container maxW="container.xl" mt={{ base: 4, md: 8 }}>
        <Heading size="lg" mb="4">
          Job Search Results
        </Heading>
        {isLoading ? (
          <Spinner size="xl" />
        ) : jobs.length === 0 ? (
          <Text fontSize="xl" color="red.500">
            No jobs found.
          </Text>
        ) : (
          <VStack spacing="4" align="stretch">
            {jobs.map((job) => (
              <Box
                key={job._id}
                className="job-card"
                p="4"
                boxShadow="md"
                borderRadius="md"
                bg="white"
              >
                <Heading as="h4" size="md" mb="1">
                  {job.title}
                </Heading>
                <Text fontWeight="bold" mb="2">
                  {job.userId && job.userId.organizationName
                    ? job.userId.organizationName
                    : ""}{" "}
                  | {job.location}
                </Text>
                <Text mb="4">{truncateText(job.description, 50)}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => handleViewClick(job._id)}
                  className="view-button"
                >
                  View
                </Button>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
      <Footer contentType="candidate" />
    </ChakraProvider>
  );
}

export default JobDisplay;
