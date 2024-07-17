import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchJobDetails, updateJobDetails } from "../../services/jobService";
import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";

const JobDetailsUpdate = () => {
  const { id } = useParams();
  const toast = useToast();
  const [jobDetails, setJobDetails] = useState({
    title: "",
    companyName: "",
    location: "",
    description: "",
    requirements: "",
    job_type: "",
  });

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const data = await fetchJobDetails(id);
        setJobDetails(data);
      } catch (error) {
        toast({
          title: "Error fetching job details.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getJobDetails();
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateJobDetails(id, jobDetails);
      toast({
        title: "Job updated.",
        description: "Job details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating job.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={6}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          <Box boxShadow="md" p="6" rounded="md">
            <VStack spacing={4} align="stretch">
              <Link href="#" fontWeight="bold">
                My Jobs
              </Link>
              <Link href="#" fontWeight="bold">
                Preferences
              </Link>
              <Link href="#" fontWeight="bold">
                My Network
              </Link>
              <Link href="#" fontWeight="bold">
                Tutorial
              </Link>
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
              <Text fontWeight="bold">Location</Text>
              <Input
                name="location"
                placeholder="Enter location"
                value={jobDetails.location}
                onChange={handleChange}
              />
              <Text fontWeight="bold">Job Description</Text>
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
                name="job_type"
                value={jobDetails.job_type}
                onChange={handleChange}
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </Select>
              <Flex justify="space-between" mt={4}>
                <Button colorScheme="blue" onClick={handleUpdate}>
                  Update
                </Button>
              </Flex>
            </VStack>
            <Divider mt="8" />
          </Box>
        </SimpleGrid>
      </Container>
      <Footer contentType="employer" />
    </>
  );
};

export default JobDetailsUpdate;
