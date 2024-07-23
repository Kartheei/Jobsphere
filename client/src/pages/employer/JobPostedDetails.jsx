import React, { useEffect, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  Tag,
  MenuButton,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import {
  fetchApplicationsByJobId,
  updateApplicationStatus,
} from "../../services/applicationService";
import { fetchJobDetails } from "../../services/jobService";

const JobPostedDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate hook
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobDetails(id);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast({
          title: "Error fetching job details",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getApplications = async () => {
      try {
        const applicationsData = await fetchApplicationsByJobId(id);
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    getJobDetails();
    getApplications();
  }, [id, toast]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        )
      );
      toast({
        title: `Application ${status}`,
        description: `The application has been ${status} successfully.`,
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

  if (isLoading) {
    return (
      <>
        <NavBar />
        <Center minH="100vh" mt={5}>
          <Spinner size="xl" />
        </Center>
        <Footer contentType="employer" />
      </>
    );
  }

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
          <Box
            p="6"
            boxShadow="md"
            className="recent-jobs-box"
            borderRadius="md"
            bg="#F7FAFC"
            mb={6}
          >
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  {job.title}
                </Heading>
                <Text fontWeight="bold" mb={4}>
                  {job.userId.organizationName}
                </Text>
                <Text fontWeight="bold" mb={4}>
                  {job.location}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box p="6" mb={6}>
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  Description
                </Heading>
                <Text mb={4}>{job.description}</Text>
              </Box>
            </Flex>
          </Box>

          <Box p="6" mb={6}>
            <Flex justify="space-between" alignItems="center" flexWrap="wrap">
              <Box textAlign="left" flex="1" minW="250px">
                <Heading as="h4" size="md" mb={4}>
                  Requirements
                </Heading>
                <Text mb={4}>{job.requirements}</Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading as="h4" size="md" mb={4}>
              Candidates Applied
            </Heading>
            {applications.length === 0 ? (
              <Text fontSize="lg" textAlign="center">
                No applications found for this job.
              </Text>
            ) : (
              <Flex justify={"center"} flexDirection={"column"}>
                {applications.map((application) => (
                  <Box
                    key={application._id}
                    bg={"#d1e1ec"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent="space-between"
                    p="5px"
                    borderRadius="10px"
                    mb="3px"
                  >
                    <Text p={2} pr="5px" fontWeight={"bold"}>
                      {application.user_id.name}
                    </Text>
                    <Flex gap={3} mt={1} pr={1}>
                      <Button
                        size={"sm"}
                        mt={{ base: "4", md: "0" }}
                        className="view-button"
                        onClick={() =>
                          navigate(
                            `/employer/candidate/${application.user_id._id}`
                          )
                        } // Navigate to candidate profile
                      >
                        View Profile
                      </Button>
                      <Tag
                        size="md"
                        height="31px"
                        variant="solid"
                        colorScheme={getColorScheme(application.status)}
                      >
                        {application.status}
                      </Tag>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          size={"sm"}
                        >
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              handleStatusUpdate(application._id, "accepted")
                            }
                          >
                            Accept
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusUpdate(application._id, "rejected")
                            }
                          >
                            Reject
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Box>
      </Center>
      <Footer contentType="employer" />
    </>
  );
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

export default JobPostedDetails;