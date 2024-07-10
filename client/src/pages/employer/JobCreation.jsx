import { useContext, useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import { AuthContext } from "../../context/AuthContext";
import { createJob } from "../../services/jobService";

function JobCreation() {
  const { user, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    jobDescription: "",
    jobRequirements: "",
    employmentType: "",
    salary: "",
  });

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await createJob(formData);
      if (response) {
        toast({
          title: "Job posted.",
          description: "Your job has been posted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear the form
        setFormData({
          jobTitle: "",
          location: "",
          jobDescription: "",
          jobRequirements: "",
          employmentType: "",
          salary: "",
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (user && user.role !== "Employer") {
    return (
      <Container maxW="container.xl" mt="8">
        <Text fontSize="xl" color="red.500">
          You are not authorized to create a job.
        </Text>
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
        <Box>
          <Heading size="xl" mb="8" textAlign="left">
            Create new job
          </Heading>
          <VStack spacing="6" align="start" as="form" onSubmit={handleSubmit}>
            <FormControl id="jobTitle" isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="salary" isRequired>
              <FormLabel>Salary Range</FormLabel>
              <Input
                placeholder="Enter salary range"
                value={formData.salary}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="jobDescription" isRequired>
              <FormLabel>Job Description</FormLabel>
              <Textarea
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="jobRequirements" isRequired>
              <FormLabel>Job Requirements</FormLabel>
              <Textarea
                placeholder="Enter job requirements"
                value={formData.jobRequirements}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="employmentType" isRequired>
              <FormLabel>Employment Type</FormLabel>
              <Select
                placeholder="Select employment type"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </VStack>
        </Box>
      </Container>
      <Footer contentType="employer" />
    </>
  );
}

export default JobCreation;
