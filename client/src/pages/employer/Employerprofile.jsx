import React from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  CSSReset,
  Text,
  HStack,
  VStack,
  Image,
  SimpleGrid,
  Stack,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import NavBar from "../../components/employer/NavBar";
import Footer from "../../components/common/Footer";
import "../../assets/styles/Employerprofile.css";

const ProfilePage = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />
      <Box className="cover-image" mb="4">
        <Heading size="xl">Cover Image</Heading>
        <Text>Company Quote</Text>
      </Box>

      <Container maxW="container.xl" mt="8">
        <Flex alignItems="flex-start" mb="8">
          <Box className="profile-picture" mr="4">
            <Image
              src="/images/profile.png"
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
            />
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb="4">
              Company Name
            </Heading>
            <HStack spacing="4" mb="4">
              <Button className="follow-button">Follow</Button>
              <Button className="message-button">Message</Button>
            </HStack>
          </Box>
        </Flex>
        <Box mb="8">
          <Heading size="md" mb="4">
            About Company
          </Heading>
          <Text>
            Jobsphere is a cutting-edge professional networking platform
            designed to bridge the gap between job seekers and employers.
          </Text>
        </Box>

        <Box mb="8">
          <Heading size="md" mb="4">
            Recent Job Openings
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box className="job-card">
              <Heading size="sm" mb="2">
                Job Title
              </Heading>
              <Text mb="2">Job Description</Text>
              <Text mb="2">Job Category</Text>
              <HStack spacing="4">
                <Button className="apply-button">Apply</Button>
                <Button className="save-button">Save</Button>
              </HStack>
            </Box>
            <Box className="job-card">
              <Heading size="sm" mb="2">
                Job Title
              </Heading>
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
            <Heading size="sm" mb="2">
              Company Insights
            </Heading>
            <Text>Total Employees: 500+</Text>
            <Text>Global Offices: 10 locations</Text>
          </Box>
          <Box className="testimonial-card">
            <Heading size="sm" mb="2">
              Employee Testimonials
            </Heading>
            <Text>
              &quot;XYZ Company is an amazing place to work with endless
              opportunities for growth.&quot;
            </Text>
            <Text>- John Doe</Text>
          </Box>
        </SimpleGrid>
      </Container>

      <Footer contentType="employer" />
    </ChakraProvider>
  );
};

export default ProfilePage;
