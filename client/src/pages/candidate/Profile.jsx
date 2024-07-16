import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Input,
  Textarea,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';

import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";

function Profile() {
  const handleViewResume = () => {
    // Logic to view resume
    console.log("View Resume");
  };

  const handleUploadResume = () => {
    // Logic to upload resume
    console.log("Upload Resume");
  };

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
        {/* Cover Image and Quote Section */}
        <Box
          bg="blue.500"
          color="white"
          borderRadius="md"
          p="6"
          mb="8"
          textAlign="center"
        >
          <Heading size="xl">Profile</Heading>
        </Box>

        {/* Profile Picture and Basic Info Section */}
        <Flex alignItems="center" mb="8" bg="gray.50" p="6" borderRadius="md">
          <Box mr="6">
            <Image
              src="./images/profile.png"
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
            />
          </Box>
          <VStack spacing="4" align="flex-start" flex="1">
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Name
              </FormLabel>
              <Input placeholder="Enter your name" size="lg" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Title
              </FormLabel>
              <Input placeholder="Enter your title" size="lg" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Location
              </FormLabel>
              <Input placeholder="Enter your location" size="lg" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="bold">
                Contact Details
              </FormLabel>
              <Input placeholder="Enter your email" size="lg" mb="2" />
              <Input placeholder="Enter your phone number" size="lg" />
            </FormControl>
          </VStack>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue" size="lg" ml="6">
              Resume
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleViewResume}>View</MenuItem>
              <MenuItem onClick={handleUploadResume}>Upload</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Divider mb="8" />

        {/* About Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            About
          </Heading>
          <Textarea placeholder="Tell us about yourself..." size="lg" />
        </Box>

        <Divider mb="8" />

        {/* Experience Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            <Box p="4" bg="gray.100" borderRadius="md">
              <Heading size="md" mb="2">
                Job Title
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Company Name
              </Text>
              <Text fontSize="sm" color="gray.600">
                Duration
              </Text>
              <Textarea
                mt="2"
                placeholder="Describe your responsibilities and achievements"
                size="sm"
              />
            </Box>
            <Button colorScheme="blue" variant="outline" alignSelf="flex-start">
              Add Experience
            </Button>
          </VStack>
        </Box>

        <Divider mb="8" />

        {/* Education Section */}
        <Box mb="8">
          <Heading size="lg" mb="4">
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            <Box p="4" bg="gray.100" borderRadius="md">
              <Heading size="md" mb="2">
                Degree
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Institution Name
              </Text>
              <Text fontSize="sm" color="gray.600">
                Years Attended
              </Text>
              <Textarea
                mt="2"
                placeholder="Describe your major and coursework"
                size="sm"
              />
            </Box>
            <Button colorScheme="blue" variant="outline" alignSelf="flex-start">
              Add Education
            </Button>
          </VStack>
        </Box>
      </Container>
      <Footer contentType="candidate" />
    </>
  );
}

export default Profile;
