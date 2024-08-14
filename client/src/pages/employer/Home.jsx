import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Lazy load components for better performance
const NavBar = React.lazy(() => import("../../components/employer/NavBar"));
const Footer = React.lazy(() => import("../../components/common/Footer"));
const RecentJobs = React.lazy(
  () => import("../../components/employer/RecentJobs")
);
const Stats = React.lazy(() => import("../../components/employer/Stats"));

import "../../assets/styles/empHome.css";
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
        toast({
          title: "Error fetching data.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getStatsAndJobs();
  }, [toast]);

  const handlePostJobClick = useCallback(() => {
    navigate("/employer/job-creation");
  }, [navigate]);

  // Memoize components to prevent unnecessary re-renders
  const memoizedStats = useMemo(() => <Stats stats={stats} />, [stats]);
  const memoizedRecentJobs = useMemo(
    () => <RecentJobs recentJobs={recentJobs} />,
    [recentJobs]
  );

  return (
    <>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <NavBar />
      </React.Suspense>

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
            <React.Suspense fallback={<Spinner size="lg" />}>
              {memoizedStats}
              {memoizedRecentJobs}
            </React.Suspense>
          </>
        )}
      </Container>

      <React.Suspense fallback={<Spinner size="xl" />}>
        <Footer contentType="employer" />
      </React.Suspense>
    </>
  );
};

export default Home;
