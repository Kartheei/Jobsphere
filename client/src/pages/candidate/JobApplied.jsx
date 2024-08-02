import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  useToast,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/empHome.css";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { getApplicationStatus } from "../../services/applicationService";
import { fetchJobsApplied } from "../../services/jobService";

const JobApplied = () => {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobsApplied();
        const jobsWithStatus = await Promise.all(
          jobsData.map(async (job) => {
            if (job && job._id) {
              const statusData = await getApplicationStatus(job._id);
              return { ...job, applicationStatus: statusData.status };
            }
            return null;
          })
        );
        setJobList(jobsWithStatus.filter((job) => job !== null));
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

  const handleViewClick = (jobId) => {
    navigate(`/jobs/jobDetails/${jobId}`);
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

  const [rightNav, setRightNav] = useState([
    "My Jobs",
    "Preferences",
    "My Network",
    "Interview Prep Tips",
  ]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
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
          height={"310px"}
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
                  opacity={data.status === "inactive" ? 0.5 : 1}
                >
                  <Flex
                    justify="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box textAlign="left" flex="1" minW="250px">
                      <Heading as="h4" size="md" mb="1">
                        {data.title}
                        {data.applicationStatus && (
                          <Tag
                            size="md"
                            variant="solid"
                            textTransform="capitalize"
                            colorScheme={getColorScheme(data.applicationStatus)}
                            ml="5"
                          >
                            {data.applicationStatus}
                          </Tag>
                        )}
                      </Heading>
                      <Text mb={4}>{data.organizationName}</Text>
                      <Text mb={4}>{truncateText(data.description, 40)}</Text>
                      {data.status === "inactive" && (
                        <Text color="red.500" fontWeight="bold">
                          Job is expired.
                        </Text>
                      )}
                    </Box>

                    <Button
                      className="apply-button"
                      onClick={() => handleViewClick(data._id)}
                    >
                      View
                    </Button>
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

export default JobApplied;
