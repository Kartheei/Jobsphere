import React, { useEffect, useState, Suspense } from "react";

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
  Flex,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../../components/candidate/NavBar";
import { fetchJobs, searchJobs } from "../../services/jobService";
const LazyFooter = React.lazy(() => import("../../components/common/Footer"));

function JobDisplay() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
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
          setIsSearch(true);
        } else {
          jobsData = await fetchJobs();
          setIsSearch(false);
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
      <Container maxW="container.xl" my={{ base: 4, md: 10 }} mb={20}>
        <Heading size="lg" mb="10">
          {isSearch
            ? "Job Search Results"
            : "Top Picks for You Based on Your Profile"}
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
                opacity={job.status === "inactive" ? 0.5 : 1}
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
                <Flex gap="2" justifyContent="flex-end" alignItems="center">
                  {job.status === "inactive" && (
                    <Text color="red.500" fontWeight="bold">
                      Job is expired.
                    </Text>
                  )}
                  <Button
                    colorScheme="blue"
                    onClick={() => handleViewClick(job._id)}
                    className="view-button"
                  >
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
      <Suspense fallback={<Spinner size="xl" />}>
        <LazyFooter contentType="candidate" />
      </Suspense>
    </ChakraProvider>
  );
}

export default JobDisplay;
