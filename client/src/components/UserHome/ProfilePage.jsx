import React from 'react';
import { ChakraProvider, Box, Button, Container, Flex, Heading, Link, Stack, Text, HStack, VStack, CSSReset, Image, Input } from '@chakra-ui/react';
import './ProfilePage.css';
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
          <HStack spacing="4" display={{ base: 'flex', md: 'none' }} mt="4" justify="center">
            <Link>Home</Link>
            <Link>Find a Job</Link>
            <Link>About</Link>
            <Link>Contact</Link>
          </HStack>
          <HStack spacing="4" display={{ base: 'flex', md: 'none' }} mt="4" justify="center">
            <Button className="sign-up-button">Sign Up</Button>
            <Button className="login-button">Login</Button>
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.xl" mt="8">
        <Box className="cover-image" mb="4">
          <Heading size="xl">Cover Image</Heading>
          <Text>Quote</Text>
        </Box>
        <Flex alignItems="center" mb="8">
          <Box className="profile-picture" mr="4">
            <Image src={profileImage} alt="Profile" borderRadius="full" boxSize="150px" />
          </Box>
          <Input placeholder="JOHN DOE" size="lg" className="input-field" />
        </Flex>
        <VStack align="start" spacing="6" mt="8">
          <Box className="section">
            <Heading size="md" mb="4">About</Heading>
            <Box className="content-placeholder" />
          </Box>
          <Box className="section">
            <Heading size="md" mb="4">Experience</Heading>
            <Box className="content-placeholder" />
          </Box>
          <Box className="section">
            <Heading size="md" mb="4">Education</Heading>
            <Box className="content-placeholder" />
          </Box>
        </VStack>
      </Container>

      <Box as="footer" className="footer">
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
                <Link>Home</Link>
                <Link>Find a Job</Link>
                <Link>Contact Us</Link>
                <Link>About Us</Link>
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
