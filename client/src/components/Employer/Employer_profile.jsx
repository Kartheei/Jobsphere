import React from 'react';
import { ChakraProvider, Box, Button, Container, Flex, Heading, Link, Stack, Text, HStack, VStack, CSSReset, Image, SimpleGrid } from '@chakra-ui/react';
import './Employer_profile.css';
import profileImage from '../../images/candidate.jpg'; // Corrected import path

function ProfilePage() {
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
              <Link>Post a Job</Link>
              <Link>Find Employee</Link>
              <Button className="sign-up-button">Sign Up</Button>
              <Button className="login-button">Login</Button>
            </HStack>
          </Flex>
          <HStack spacing="4" display={{ base: 'flex', md: 'none' }} mt="4" justify="center">
            <Link>Post a Job</Link>
            <Link>Find Employee</Link>
            <Button className="sign-up-button">Sign Up</Button>
            <Button className="login-button">Login</Button>
          </HStack>
        </Container>
      </Box>

      <Box className="cover-image" mb="4">
        <Heading size="xl">Cover Image</Heading>
        <Text>Company Quote</Text>
      </Box>

      <Container maxW="container.xl" mt="8">
        <Flex alignItems="flex-start" mb="8">
          <Box className="profile-picture" mr="4">
            <Image src={profileImage} alt="Profile" borderRadius="full" boxSize="150px" />
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb="4">Company Name</Heading>
            <HStack spacing="4" mb="4">
              <Button className="follow-button">Follow</Button>
              <Button className="message-button">Message</Button>
            </HStack>
          </Box>
        </Flex>
        <Box mb="8">
          <Heading size="md" mb="4">About Company</Heading>
          <Text>
            Jobsphere is a cutting-edge professional networking platform designed to bridge the gap between job seekers and employers.
          </Text>
        </Box>

        <Box mb="8">
          <Heading size="md" mb="4">Recent Job Openings</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box className="job-card">
              <Heading size="sm" mb="2">Job Title</Heading>
              <Text mb="2">Job Description</Text>
              <Text mb="2">Job Category</Text>
              <HStack spacing="4">
                <Button className="apply-button">Apply</Button>
                <Button className="save-button">Save</Button>
              </HStack>
            </Box>
            <Box className="job-card">
              <Heading size="sm" mb="2">Job Title</Heading>
              <Text mb="2">Job Description</Text>
              <Text mb="2">Job Category</Text>
              <HStack spacing="4">
                <Button className="apply-button">Apply</Button>
                <Button className="save-button">Save</Button>
              </HStack>
            </Box>
          </SimpleGrid>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box className="insight-card">
            <Heading size="sm" mb="2">Company Insights</Heading>
            <Text>Total Employees: 500+</Text>
            <Text>Global Offices: 10 locations</Text>
          </Box>
          <Box className="testimonial-card">
            <Heading size="sm" mb="2">Employee Testimonials</Heading>
            <Text>"XYZ Company is an amazing place to work with endless opportunities for growth."</Text>
            <Text>- John Doe</Text>
          </Box>
        </SimpleGrid>
      </Container>

      <Box as="footer" className="footer">
        <Container maxW="100%" px="8">
          <Flex flexDirection={{ base: 'column', md: 'row' }} justify="space-between">
            <Box className="footer-section" mb={{ base: '8', md: '0' }}>
              <Heading as="h5" size="md" mb="4">
                About Us
              </Heading>
              <Text>
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

export default ProfilePage;
