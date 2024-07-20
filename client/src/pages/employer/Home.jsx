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
import { fetchEmployerStats, fetchRecentJobs } from "../../services/jobService";

const Home = () => {
  const [stats, setStats] = useState({ totalJobs: 0, totalApplications: 0 });
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const getStatsAndJobs = async () => {
      try {
        const [statsData, jobsData] = await Promise.all([
          fetchEmployerStats(),
          fetchRecentJobs(),
        ]);
        setStats(statsData);
        setRecentJobs(jobsData);
      } catch (error) {
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    getStatsAndJobs();
  }, [toast]);

  const handlePostJobClick = () => {
    navigate("/employer/job-creation");
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />

      <Box className="emp-hero-section">
        <Container maxW="container.md">
          <Box className="emp-hero-content">
            <Heading as="h2" size="3xl" mb="10" className="emp-hero-heading">
              Create a job post here.
            </Heading>
            <Flex mb="4" justifyContent="center">
              <Button
                className="post-job-button"
                size="lg"
                onClick={handlePostJobClick}
              >
                Post a Job
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="8" textAlign="center">
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <>
            <Flex justify="center" mb="8" flexWrap="wrap">
              <Box
                className="stat-box"
                mr="4"
                mb={{ base: "4", md: "0" }}
                bg="#2d3748"
                color="white"
              >
                <Heading as="h3" size="xl">
                  {stats.totalJobPosts}
                </Heading>
                <Text>Total job posts</Text>
              </Box>
              <Box className="stat-box" bg="#2d3748" color="white">
                <Heading as="h3" size="xl">
                  {stats.totalApplicationsReceived}
                </Heading>
                <Text>Applications received</Text>
              </Box>
            </Flex>

            <Heading as="h3" size="xl" mb="8">
              Recent Jobs Post
            </Heading>
            {recentJobs.map((job, index) => (
              <Box
                key={index}
                p="6"
                boxShadow="md"
                className="recent-jobs-box"
                borderRadius="md"
                bg="#F7FAFC"
                mb={4}
              >
                <Flex
                  justify="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box textAlign="left" flex="1" minW="250px">
                    <Heading as="h4" size="md">
                      {job.title}
                    </Heading>
                    <Text fontWeight="bold">{job.organizationName}</Text>
                    <Text mt="4">{job.description}</Text>
                  </Box>
                  <Button
                    mt={{ base: "4", md: "0" }}
                    className="view-button"
                    onClick={() => navigate(`/employer/jobs/${job._id}`)}
                  >
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
          </>
        )}
      </Container>

      <Footer contentType="employer" />
    </ChakraProvider>
  );
};

export default Home;
