import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  CSSReset,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/empHome.css";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import { fetchJoblistbyEmployer, deleteJob } from "../../services/jobService";

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

  const [rightNav, setRightNav] = useState([
    "My Jobs",
    "Preferences",
    "My Network",
    "Tutorial",
  ]);

  const truncateDescription = (description, limit = 500) => {
    if (description.length > limit) {
      return description.substring(0, limit) + " ....";
    }
    return description;
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

  return (
    <>
      <NavBar />
      <Flex p={5} justifyContent={"center"} columnGap={5}>
        <Box
          p="6"
          boxShadow="md"
          className="recent-jobs-box"
          borderRadius="md"
          bg="#F7FAFC"
          mb={6}
          width={"20%"}
        >
          {rightNav &&
            rightNav.map((data, index) => (
              <Text key={index} fontWeight="bold" mb={4} textAlign={"center"}>
                {data}
              </Text>
            ))}
        </Box>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Box width={"70%"}>
            {jobList &&
              jobList.map((data, index) => (
                <Box
                  p="6"
                  boxShadow="md"
                  className="recent-jobs-box"
                  borderRadius="md"
                  bg="#F7FAFC"
                  mb={6}
                  key={index}
                >
                  <Flex
                    justify="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box textAlign="left" flex="1" minW="250px">
                      <Heading as="h4" size="md" mb="2">
                        {data.title}
                      </Heading>
                      <Text fontWeight="bold" mb="2">
                        {data.organizationName}
                      </Text>
                      <Text mb="1">
                        {truncateDescription(data.description)}
                      </Text>
                    </Box>
                    <Flex flexDirection={"column"} gap={3}>
                      <Button
                        mt={{ base: "4", md: "0" }}
                        className="view-button"
                        onClick={() => handleViewClick(data._id)}
                      >
                        View
                      </Button>
                      <Button
                        mt={{ base: "4", md: "0" }}
                        className="view-button"
                        onClick={() => handleEditClick(data._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        mt={{ base: "4", md: "0" }}
                        className="btn-delete"
                        onClick={() => handleDeleteClick(data._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))}
          </Box>
        )}
      </Flex>
      <Footer contentType="employer" />
    </>
  );
};

export default JobPosted;
