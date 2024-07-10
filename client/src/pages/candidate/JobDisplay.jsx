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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/candidate/Footer";
import { fetchAllJobs } from "../../services/authService";

function JobDisplay() {
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

          {loading ? (
            <Spinner />
          ) : (
            <VStack spacing="4" align="start">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Box key={job._id} className="job-card" borderWidth="1px" borderRadius="lg" p={5} mb={5} width="100%">
                    <Heading size="md" mb="2">
                      {job.jobTitle}
                    </Heading>
                    <Text fontWeight="bold">{job.companyName}</Text>
                    <Text mb="2">{job.jobDescription}</Text>
                    <Text mb="2" mt={2} color="gray.500"> {job.employmentType}</Text>
                    <Text mb="4" mt={1} color="gray.500">{job.location}</Text>
                    <Button className="apply-button">Apply</Button>
                  </Box>
                ))
              ) : (
                <Text>No jobs available</Text>
              )}
            </VStack>
          )}

          {/* <Heading size="lg" mt="8" mb="4">
            Hiring in Your Network
          </Heading>
          <VStack spacing="4" align="start">
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
            <Box className="job-card">
              <Heading size="md" mb="2">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mb="4">
                Seeking a skilled software engineer with 3+ years of experience
                in JavaScript, Python, and cloud computing. Responsibilities
                include developing scalable web applications and collaborating
                with cross-functional teams.
              </Text>
              <Button className="apply-button">Apply</Button>
            </Box>
          </VStack> */}
        </Box>
      </Container>

      <Footer />
    </ChakraProvider>
  );
}

export default JobDisplay;
