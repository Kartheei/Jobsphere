
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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/employer/NavBar";
import Footer from "../../components/employer/Footer";

function JobCreation() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the job posting data
    const jobData = {
      jobTitle,
      companyName,
      location,
      jobDescription,
      jobRequirements,
      employmentType,
    };

    try {
      // Send the job data to the API
      await axios.post("http://localhost:5000/api/jobs", jobData);
      toast({
        title: "Job posted.",
        description: "Your job has been posted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the form
      setJobTitle("");
      setCompanyName("");
      setLocation("");
      setJobDescription("");
      setJobRequirements("");
      setEmploymentType("");
    } catch (error) {
      console.error("Error posting job:", error);
      toast({
        title: "Error.",
        description: "There was an error posting the job.",
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
            Create new job
          </Heading>
          <VStack spacing="6" align="start" as="form" onSubmit={handleSubmit}>
            <FormControl id="job-title" isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input 
                placeholder="Enter job title" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="company-name" isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input 
                placeholder="Enter company name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Input 
                placeholder="Enter location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
            <FormControl id="job-description" isRequired>
              <FormLabel>Job Description with Salary Range</FormLabel>
              <Textarea 
                placeholder="Enter job description and salary range"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="job-requirements" isRequired>
              <FormLabel>Job Requirements</FormLabel>
              <Textarea 
                placeholder="Enter job requirements"
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
              />
            </FormControl>
            <FormControl id="employment-type" isRequired>
              <FormLabel>Employment Type</FormLabel>
              <Select 
                placeholder="Select employment type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </Select>
            </FormControl>
            <Button colorScheme="blue" size="lg" type="submit">
              Submit
            </Button>
          </VStack>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default JobCreation;

