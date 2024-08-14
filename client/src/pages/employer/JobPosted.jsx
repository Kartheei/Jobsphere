import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  VStack,
  Icon,
  Stack,
  Container,
  Grid,
  GridItem,
  Checkbox,
} from "@chakra-ui/react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/employer/NavBar";
const Footer = React.lazy(() => import("../../components/common/Footer"));
import "../../assets/styles/empHome.css";
import {
  fetchJoblistbyEmployer,
  deleteJob,
  updateJobStatus,
} from "../../services/jobService";

import "./JobPosted.css";

const JobPosted = () => {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJoblistbyEmployer();
        setJobList(jobsData);
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

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleEditClick = (jobId) => {
    navigate(`/employer/jobs/${jobId}/edit`);
  };

  const handleDeleteClick = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobList((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast({
        title: "Job deleted.",
        description: "The job has been deleted successfully.",
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

  const handleViewClick = (jobId) => {
    navigate(`/employer/jobs/${jobId}`);
  };

  const handleStatusChange = async (jobId, isActive) => {
    try {
      await updateJobStatus(jobId, isActive);
      setJobList((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? { ...job, status: isActive ? "active" : "inactive" }
            : job
        )
      );
      toast({
        title: "Job status updated.",
        description: "The job status has been updated successfully.",
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

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt={8} mb={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6}>
          <GridItem>
            {isLoading ? (
              <Spinner size="xl" />
            ) : (
              <Stack spacing={6}>
                {jobList && jobList.length > 0 ? (
                  jobList.map((data, index) => (
                    <Box
                      key={index}
                      p={6}
                      boxShadow="md"
                      borderRadius="lg"
                      bg="white"
                      className="job-box"
                    >
                      <Flex justify="space-between" alignItems="center">
                        <Box flex="1" mr={4}>
                          <Heading as="h4" size="md" mb={2} color="blue.700">
                            {data.title}
                          </Heading>
                          <Text fontWeight="bold" mb={2} color="gray.600">
                            {data.organizationName}
                          </Text>
                          <Text mb={4} color="gray.500">
                            {truncateText(data.description, 40)}
                          </Text>
                          <Text fontWeight="bold" color="gray.600">
                            Total Applications: {data.applicationCount || 0}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex
                        direction="row"
                        mt="5"
                        justifyContent="space-between"
                      >
                        <Checkbox
                          size="lg"
                          colorScheme="blue"
                          isChecked={data.status === "active"}
                          onChange={(e) =>
                            handleStatusChange(data._id, e.target.checked)
                          }
                        >
                          Active
                        </Checkbox>

                        <Flex gap="2">
                          <Button
                            size="sm"
                            colorScheme="blue"
                            leftIcon={<Icon as={Eye} />}
                            onClick={() => handleViewClick(data._id)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            leftIcon={<Icon as={Pencil} />}
                            onClick={() => handleEditClick(data._id)}
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            leftIcon={<Icon as={Trash2} />}
                            onClick={() => handleDeleteClick(data._id)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  ))) : (
                  <Box
                    p={6}
                    boxShadow="md"
                    borderRadius="lg"
                    bg="white"
                    className="job-box"
                    h={'250px'}
                    bgColor={'#E2E8F0'}>
                    <Flex justifyContent={'center'} pt={20}>
                      <Heading as="h5" size="md" mb={2} >
                        No jobs posted yet ...!!!
                      </Heading>
                    </Flex>
                  </Box>
                )
                }
              </Stack>
            )}
          </GridItem>
        </Grid>
      </Container>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <Footer contentType="employer" />
      </React.Suspense>
    </>
  );
};

export default JobPosted;
