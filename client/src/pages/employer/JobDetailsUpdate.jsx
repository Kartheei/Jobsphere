import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Input,
  Textarea,
  Select,
  Divider,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";

const JobDetailsUpdate = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "Current Job Title",
    companyName: "Current Company Name",
    location: "Current Location",
    description: "Current Job Description with salary range",
    requirements: "Current Job requirements",
    category: "Current category",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Job updated:", jobDetails);
  };

  const handleDisable = () => {
    // Handle disable logic here
    console.log("Job disabled");
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Job deleted");
  };

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={6}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          <Box boxShadow="md" p="6" rounded="md">
            <VStack spacing={4} align="stretch">
              <Link href="#" fontWeight="bold">My Jobs</Link>
              <Link href="#" fontWeight="bold">Preferences</Link>
              <Link href="#" fontWeight="bold">My Network</Link>
              <Link href="#" fontWeight="bold">Tutorial</Link>
            </VStack>
          </Box>
          <Box gridColumn="span 2">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h2" size="lg">
                Edit the Job Posting
              </Heading>
            </Flex>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold"> Job Title</Text>
              <Input
                name="title"
                placeholder="Enter job title"
                value={jobDetails.title}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Company Name</Text>
              <Input
                name="companyName"
                placeholder="Enter company name"
                value={jobDetails.companyName}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Location</Text>
              <Input
                name="location"
                placeholder="Enter location"
                value={jobDetails.location}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Job Description with Salary Range</Text>
              <Textarea
                name="description"
                placeholder="Enter description"
                value={jobDetails.description}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Job Requirements</Text>
              <Textarea
                name="requirements"
                placeholder="Enter requirements"
                value={jobDetails.requirements}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Job Category</Text>
              <Select
                name="category"
                value={jobDetails.category}
                onChange={handleChange}
              >
                <option value="Current category">Current category</option>
                <option value="Category 1">Full-time</option>
                <option value="Category 2">Part-time</option>
                <option value="Category 3">Contract</option>
              </Select>
              <Flex justify="space-between" mt={4}>
                <Button colorScheme="blue" onClick={handleUpdate}>
                  Update
                </Button>
                <Button colorScheme="red" onClick={handleDisable}>
                  Disable
                </Button>
                <Button colorScheme="red" variant="outline" onClick={handleDelete}>
                  Delete
                </Button>
              </Flex>
            </VStack>
            <Divider mt="8" />
          </Box>
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
};

export default JobDetailsUpdate;
