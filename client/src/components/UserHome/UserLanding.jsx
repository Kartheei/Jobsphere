import React from 'react';
import { ChakraProvider, Box, Button, Container, Flex, Heading, Link, Stack, Text, HStack, VStack, CSSReset, Input, SimpleGrid, Image } from '@chakra-ui/react';
import './UserLanding.css';

function UserLanding() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box as="header" className="header">
        <Container maxW="100%" px="8">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">
              JobSphere
            </Heading>
            <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
              <Link>Home</Link>
              <Link>Find a Job</Link>
              <Link>About</Link>
              <Link>Contact</Link>
            </HStack>
            <HStack spacing="4" display={{ base: 'none', md: 'flex' }}>
              <Button className="sign-up-button">Sign Up</Button>
              <Button className="login-button">Login</Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box className="hero-section" py="24" backgroundImage="url('../../images/hero.webp')" backgroundSize="cover" backgroundPosition="center">
        <Container maxW="container.md" textAlign="center">
          <Heading as="h2" size="3xl" mb="4" color="#2A4365">Find the most exciting jobs</Heading>
          <Flex justifyContent="center" mb="4">
            <Input placeholder="Job Title and Keyword" mr="2" bg="white" />
            <Input placeholder="Location" mr="2" bg="white" />
            <Button className="search-button" width="150px">Search</Button>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="16">
        <Heading as="h3" size="xl" mb="8" textAlign="center">Get Your Job</Heading>
        <VStack spacing="8" align="stretch">
          <Box className="job-card">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h4" size="md" mb="2">Software Engineer</Heading>
                <Text fontWeight="bold">Tech Innovators Inc.</Text>
                <Text mb="4">
                  Seeking a skilled software engineer with 3+ years of experience in JavaScript, Python, and cloud computing. Responsibilities include developing scalable web applications and collaborating with cross-functional teams.
                </Text>
              </Box>
              <Button className="apply-button" width="120px">Apply</Button>
            </Flex>
          </Box>
          <Box className="job-card">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h4" size="md" mb="2">Software Engineer</Heading>
                <Text fontWeight="bold">Tech Innovators Inc.</Text>
                <Text mb="4">
                  Seeking a skilled software engineer with 3+ years of experience in JavaScript, Python, and cloud computing. Responsibilities include developing scalable web applications and collaborating with cross-functional teams.
                </Text>
              </Box>
              <Button className="apply-button" width="120px">Apply</Button>
            </Flex>
          </Box>
        </VStack>
      </Container>

      <Box as="footer" className="footer" py="16" mt="16">
        <Container maxW="100%" px="8">
          <Flex flexDirection={{ base: 'column', md: 'row' }} justify="space-between">
            <Box className="footer-section" mb={{ base: '8', md: '0' }}>
              <Heading className="footer-section1" as="h5" size="md" mb="4">About Us</Heading>
              <Text className="footer-section1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Box>
            <Box className="footer-section" mb={{ base: '8', md: '0' }}>
              <Heading as="h5" size="md" mb="4">Contact</Heading>
              <Text>Address: 123 Main St. Waterloo, On, Canada 85486</Text>
              <Text>Email: info@jobsphere.com</Text>
              <Text>Contact: +1 (254) 265-5555</Text>
            </Box>
            <Box className="footer-section">
              <Heading as="h5" size="md" mb="4">Important Links</Heading>
              <Stack spacing="2">
                <Link>Home</Link>
                <Link>Find a job</Link>
                <Link>Contact Us</Link>
                <Link>About Us</Link>
              </Stack>
            </Box>
          </Flex>
          <Text textAlign="center" mt="8">&copy; 2024 All rights reserved by JobSphere</Text>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default UserLanding;
