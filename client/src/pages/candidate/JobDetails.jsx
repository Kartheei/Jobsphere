import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Spinner,
  HStack,
  useToast,
  Tag,
} from "@chakra-ui/react";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import {
  applyForJob,
  getApplicationStatus,
} from "../../services/applicationService"; // Import the services
import { fetchJobDetails } from "../../services/jobService";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobDetails(id);
        setJob(jobData);
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

    const getApplicationStatusForJob = async () => {
      try {
        const statusData = await getApplicationStatus(id);
        setApplicationStatus(statusData.status);
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    getJobDetails();
    getApplicationStatusForJob();
  }, [id, toast]);

  const handleApplyClick = async () => {
    try {
      const response = await applyForJob(id);
      setApplicationStatus(response.status); // Set the application status
      toast({
        title: "Application submitted.",
        description: "Your application has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getColorScheme = (status) => {
    switch (status) {
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      case "pending":
      default:
        return "gray";
    }
  };

  return (
    <>
      <NavBar />
      <Center minH="100vh" mt={5}>
        <Box
          width={"80%"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          flexDirection={"column"}
        >
          {isLoading ? (
            <Spinner size="xl" />
          ) : job ? (
            <>
              <Box
                p="6"
                boxShadow="md"
                className="recent-jobs-box"
                borderRadius="md"
                bg="#F7FAFC"
                mb={6}
              >
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md" mb={4}>
                      {job.title}
                      {applicationStatus && (
                        <Tag
                          size="md"
                          variant="solid"
                          colorScheme={getColorScheme(applicationStatus)}
                          ml="5"
                        >
                          {applicationStatus}
                        </Tag>
                      )}
                    </Heading>
                    <Text fontWeight="bold" mb={4}>
                      {job.userId && job.userId.organizationName
                        ? job.userId.organizationName
                        : "Unknown Company"}
                    </Text>
                    <Text fontWeight="bold" mb={4}>
                      {job.location}
                    </Text>
                  </Box>
                  <Button
                    mt={{ base: "4", md: "0" }}
                    className="view-button"
                    onClick={handleApplyClick}
                    isDisabled={applicationStatus !== null}
                  >
                    {applicationStatus ? `Applied` : "Apply"}
                  </Button>
                </Flex>
              </Box>

              <Box
                p="6"
                boxShadow="md"
                className="recent-jobs-box"
                borderRadius="md"
                bg="#F7FAFC"
                mb={6}
              >
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md" mb={4}>
                      Description
                    </Heading>
                    <Text mb={4}>{job.description}</Text>
                  </Box>
                </Flex>
              </Box>

              <Box
                p="6"
                boxShadow="md"
                className="recent-jobs-box"
                borderRadius="md"
                bg="#F7FAFC"
                mb={6}
              >
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md" mb={4}>
                      Requirements
                    </Heading>
                    <Text mb={4}>{job.requirements}</Text>
                  </Box>
                </Flex>
              </Box>
            </>
          ) : (
            <Text fontSize="xl" color="red.500">
              Job not found.
            </Text>
          )}
        </Box>
      </Center>

      <Footer contentType="candidate" />
    </>
  );
};

export default JobDetails;
