import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Input,
  Textarea,
  Select,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import { fetchJobDetails, updateJobDetails } from "../../services/jobService";

const JobDetailsUpdate = () => {
  const { id } = useParams();
  const toast = useToast();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    location: "",
    salary: "",
    jobDescription: "",
    jobRequirements: "",
    employmentType: "",
  });

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const data = await fetchJobDetails(id);
        setJobDetails({
          jobTitle: data.title,
          location: data.location,
          salary: data.salary,
          jobDescription: data.description,
          jobRequirements: data.requirements,
          employmentType: data.job_type,
        });
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
      await updateJobDetails(id, {
        title: jobDetails.jobTitle,
        location: jobDetails.location,
        salary: jobDetails.salary,
        description: jobDetails.jobDescription,
        requirements: jobDetails.jobRequirements,
        job_type: jobDetails.employmentType,
      });
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
      <Container maxW="container.xl" mt="8">
        <Box>
          <Heading size="xl" mb="8" textAlign="left">
            Update Job Details
          </Heading>
          <VStack spacing="6" align="start">
            <FormControl id="jobTitle" isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input
                name="jobTitle"
                placeholder="Enter job title"
                value={jobDetails.jobTitle}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                placeholder="Enter location"
                value={jobDetails.location}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="salary" isRequired>
              <FormLabel>Salary Range</FormLabel>
              <Input
                name="salary"
                placeholder="Enter salary range"
                value={jobDetails.salary}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="jobDescription" isRequired>
              <FormLabel>Job Description</FormLabel>
              <Textarea
                name="jobDescription"
                placeholder="Enter job description"
                value={jobDetails.jobDescription}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="jobRequirements" isRequired>
              <FormLabel>Job Requirements</FormLabel>
              <Textarea
                name="jobRequirements"
                placeholder="Enter job requirements"
                value={jobDetails.jobRequirements}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="employmentType" isRequired>
              <FormLabel>Employment Type</FormLabel>
              <Select
                name="employmentType"
                value={jobDetails.employmentType}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              alignSelf="end"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </VStack>
        </Box>
      </Container>
      <Footer contentType="employer" />
    </>
  );
};

export default JobDetailsUpdate;
