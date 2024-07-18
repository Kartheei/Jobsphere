import { useEffect, useState } from "react";

import {
  ChakraProvider,
  CSSReset,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { fetchJobs } from "../../services/jobService";

function JobDisplay() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs();
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
  }, [toast]);

  const truncateDescription = (description, limit = 500) => {
    if (description.length > limit) {
      return description.substring(0, limit) + " ....";
    }
    return description;
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Container
        maxW="container.xl"
        mt={{ base: 4, md: 8 }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          className="sidebar"
          mr={{ base: 0, md: 12 }}
          mt={{ base: 4, md: 14 }}
          mb={{ base: 8, md: 0 }}
        >
          <Flex
            direction={{ base: "row", md: "column" }}
            wrap={{ base: "wrap", md: "nowrap" }}
            align={{ base: "center", md: "start" }}
            gap="2"
          >
            {[
              "MY JOBS",
              "PREFERENCES",
              "MY NETWORK",
              "INTERVIEW PREP TIPS",
            ].map((label) => (
              <Button
                key={label}
                className="sidebar-button"
                mb={{ base: 4, md: 0 }}
                mr={{ base: 4, md: 0 }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box flex="1">
          <Heading size="lg" mb="4">
            Top Picks for You Based on Your Profile
          </Heading>
          {isLoading ? (
            <Spinner size="xl" />
          ) : jobs.length === 0 ? (
            <Text fontSize="xl" color="red.500">
              No jobs available at the moment.
            </Text>
          ) : (
            <VStack spacing="4" align="start">
              {jobs.map((job) => (
                <Box key={job._id} className="job-card">
                  <Heading size="md" mb="2">
                    {job.title}
                  </Heading>
                  <Text fontWeight="bold">
                    {job.userId && job.userId.organizationName
                      ? job.userId.organizationName
                      : "Unknown Company"}
                  </Text>
                  <Text fontWeight="bold">{job.location}</Text>
                  <Text mb="4">{truncateDescription(job.description)}</Text>
                  <Button className="apply-button">Apply</Button>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Container>

      <Footer contentType="candidate" />
    </ChakraProvider>
  );
}

export default JobDisplay;
