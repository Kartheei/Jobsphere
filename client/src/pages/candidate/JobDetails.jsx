import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  Tag,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import {
  applyForJob,
  getApplicationStatus,
} from "../../services/applicationService";
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

  // Convert requirements and description string to arrays
  const requirementsArray = job?.requirements
    ? job.requirements.split(/\r?\n/) // Split by newline characters
    : [];
  const descriptionArray = job?.description
    ? job.description.split(/\r?\n/) // Split by newline characters
    : [];

  return (
    <>
      <NavBar />
      <Center mt={5}>
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
                          textTransform="capitalize"
                          colorScheme={getColorScheme(applicationStatus)}
                          ml="5"
                        >
                          {applicationStatus}
                        </Tag>
                      )}
                    </Heading>
                    <Text fontWeight="bold" mb="5">
                      {job.userId && job.userId.organizationName
                        ? job.userId.organizationName
                        : ""}{" "}
                      | {job.location}
                    </Text>
                    <Text mb="1">Salary: {job.salary || "Not specified"}</Text>
                    <Text>
                      Job Type:{" "}
                      {job.job_type.charAt(0).toUpperCase() +
                        job.job_type.slice(1)}
                    </Text>
                  </Box>
                  <Flex direction="column" gap="2">
                    <Button
                      mt={{ base: "4", md: "0" }}
                      className="view-button"
                      onClick={handleApplyClick}
                      isDisabled={applicationStatus !== null}
                    >
                      {applicationStatus ? `Applied` : "Apply"}
                    </Button>
                    {job.status === "inactive" && (
                      <Text color="red.500" fontWeight="bold">
                        Job is expired.
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Box>

              <Box p="4" mb={2}>
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md" mb={4}>
                      Description
                    </Heading>
                    {descriptionArray.map((desc, index) => (
                      <Text key={index} mb={4}>
                        {desc}
                      </Text>
                    ))}
                  </Box>
                </Flex>
              </Box>

              <Box p="4" mb={6}>
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md" mb={4}>
                      Requirements
                    </Heading>
                    <List spacing={1}>
                      {requirementsArray.map((req, index) => (
                        <ListItem key={index}>
                          <UnorderedList>
                            <ListItem>{req}</ListItem>
                          </UnorderedList>
                        </ListItem>
                      ))}
                    </List>
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
