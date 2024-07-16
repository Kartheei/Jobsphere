import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";

const JobListings = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Innovators Inc.',
      description: 'Seeking a skilled software engineer with 3+ years of experience in JavaScript, Python, and cloud computing. Responsibilities include developing scalable web applications and collaborating with cross-functional teams.',
      applications: 15,
      active: true,
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Creative Solutions LLC',
      description: 'Looking for a creative frontend developer with experience in React, CSS, and responsive design. Responsibilities include building user-friendly web interfaces and collaborating with designers.',
      applications: 10,
      active: true,
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Innovative Tech Corp.',
      description: 'Experienced backend developer needed with expertise in Node.js, Express, and database management. Responsibilities include creating robust server-side applications and ensuring high performance.',
      applications: 20,
      active: true,
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Design Hub',
      description: 'Seeking a talented UI/UX designer with a strong portfolio and experience in Adobe XD, Figma, and user research. Responsibilities include designing intuitive user interfaces and enhancing user experience.',
      applications: 12,
      active: true,
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Data Analytics Inc.',
      description: 'Looking for a data scientist with expertise in Python, R, and machine learning. Responsibilities include analyzing large datasets, building predictive models, and working with cross-functional teams.',
      applications: 8,
      active: true,
    },
      
  ]);

  const toggleActiveStatus = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, active: !job.active } : job
      )
    );
  };

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
        <Heading as="h1" size="xl" mb="8">
          My Job Listings
        </Heading>
        {jobs.map((job) => (
          <Box key={job.id} p="4" bg="gray.50" borderRadius="md" mb="4">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="md">{job.title}</Heading>
                <Text>{job.company}</Text>
                <Text>{job.description}</Text>
                <Text>Applications Received: {job.applications}</Text>
              </Box>
              <VStack>
                <Button
                  colorScheme={job.active ? 'green' : 'red'}
                  onClick={() => toggleActiveStatus(job.id)}
                >
                  {job.active ? 'Active' : 'Disable'}
                </Button>
                <Button colorScheme="blue">Edit</Button>
                <Button colorScheme="red">Delete</Button>
              </VStack>
            </Flex>
          </Box>
        ))}
        <Divider mt="8" />
      </Container>
      <Footer />
    </>
  );
};

export default JobListings;
