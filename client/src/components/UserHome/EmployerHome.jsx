import React from 'react';
import { ChakraProvider, Box, Button, Container, Flex, Heading, Link, Stack, Text, HStack, VStack, CSSReset } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './EmployerHome.css';

function EmployerHome() {
  const navigate = useNavigate();

  const handlePostJobClick = () => {
    navigate('/job-creation');
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box as="header" className="header" bg="#1a202c">
        <Container maxW="100%" px="8">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="white">
              JobSphere
            </Heading>
            <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
              <Link color="white">Post a Job</Link>
              <Link color="white">Find Employee</Link>
            </HStack>
            <HStack spacing="4" display={{ base: 'none', md: 'flex' }}>
              <Button variant="outline" colorScheme="whiteAlpha">Sign Up</Button>
              <Button colorScheme="whiteAlpha">Login</Button>
            </HStack>
          </Flex>
          <HStack spacing="4" display={{ base: 'flex', md: 'none' }} mt="4" justify="center">
            <Link color="white">Post a Job</Link>
            <Link color="white">Find Employee</Link>
          </HStack>
          <HStack spacing="4" display={{ base: 'flex', md: 'none' }} mt="4" justify="center">
            <Button variant="outline" colorScheme="whiteAlpha">Sign Up</Button>
            <Button colorScheme="whiteAlpha">Login</Button>
          </HStack>
        </Container>
      </Box>

      <Box className="hero-section" py="24" backgroundImage="url('../../images/employer-home.png')" backgroundSize="cover" backgroundPosition="center">
        <Container maxW="container.md" textAlign="center">
          <Heading as="h2" size="2xl" mb="4" color="white">Create a job post here.</Heading>
          <Button className="post-job-button" size="lg" bg="#1a202c" color="white" onClick={handlePostJobClick}>Post a Job</Button>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="8" textAlign="center">
        <Flex justify="center" mb="8" flexWrap="wrap">
          <Box className="stat-box" mr="4" mb={{ base: '4', md: '0' }} bg="#2d3748" color="white">
            <Heading as="h3" size="xl">28</Heading>
            <Text>Total job posts</Text>
          </Box>
          <Box className="stat-box" bg="#2d3748" color="white">
            <Heading as="h3" size="xl">28</Heading>
            <Text>Applications received</Text>
          </Box>
        </Flex>
        <Heading as="h3" size="xl" mb="8">
          Recent Jobs Post
        </Heading>
        <Box p="6" boxShadow="md" className="recent-jobs-box" borderRadius="md" bg="#F7FAFC">
          <Flex justify="space-between" alignItems="center" flexWrap="wrap">
            <Box textAlign="left" flex="1" minW="250px">
              <Heading as="h4" size="md">
                Software Engineer
              </Heading>
              <Text fontWeight="bold">Tech Innovators Inc.</Text>
              <Text mt="4">
                Seeking a skilled software engineer with 3+ years of experience in JavaScript, Python, and cloud computing. Responsibilities include developing scalable web applications and collaborating with cross-functional teams.
              </Text>
            </Box>
            <Button bg="#1a202c" color="white" mt={{ base: '4', md: '0' }}>View</Button>
          </Flex>
        </Box>
      </Container>

      <Container maxW="container.xl" mt="16" textAlign="center">
        <Flex justify="space-between" flexWrap="wrap">
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box className="info-box" p="6" boxShadow="md" borderRadius="md" bg="#F7FAFC">
              <Heading as="h4" size="lg">1</Heading>
              <Text fontWeight="bold">Create your free account</Text>
              <Text mt="4">To create create account with mail and start creating job post</Text>
            </Box>
          </Box>
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box className="info-box" p="6" boxShadow="md" borderRadius="md" bg="#F7FAFC">
              <Heading as="h4" size="lg">2</Heading>
              <Text fontWeight="bold">Build your job post</Text>
              <Text mt="4">To create create account with mail and start creating job post</Text>
            </Box>
          </Box>
          <Box flex="1" textAlign="center" p="4" minW="250px">
            <Box className="info-box" p="6" boxShadow="md" borderRadius="md" bg="#F7FAFC">
              <Heading as="h4" size="lg">3</Heading>
              <Text fontWeight="bold">Post your job</Text>
              <Text mt="4">To create create account with mail and start creating job post</Text>
            </Box>
          </Box>
        </Flex>
      </Container>

      <Box as="footer" className="footer" bg="#1a202c" color="white">
        <Container maxW="100%" px="8">
          <Flex flexDirection={{ base: 'column', md: 'row' }} justify="space-between">
            <Box className="footer-section" mb={{ base: '8', md: '0' }}>
              <Heading className="footer-section1" as="h5" size="md" mb="4">
                About Us
              </Heading>
              <Text className="footer-section1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Box>
            <Box className="footer-section" mb={{ base: '8', md: '0' }}>
              <Heading as="h5" size="md" mb="4">
                Contact
              </Heading>
              <Text>Address: 123 Main St. Waterloo, On, Canada 85486</Text>
              <Text>Email: info@jobsphere.com</Text>
              <Text>Contact: +1 (254) 265-5555</Text>
            </Box>
            <Box className="footer-section">
              <Heading as="h5" size="md" mb="4">
                Important Links
              </Heading>
              <Stack spacing="2">
                <Link>Post a Job</Link>
                <Link>Find Employees</Link>
                <Link>Support</Link>
              </Stack>
            </Box>
          </Flex>
          <Text textAlign="center" mt="8">
            &copy; 2024 All rights reserved by JobSphere
          </Text>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default EmployerHome;
