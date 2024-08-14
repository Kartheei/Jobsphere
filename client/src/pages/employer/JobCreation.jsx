import React, { useContext, useState, useEffect } from "react";

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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import NavBar from "../../components/employer/NavBar";
const Footer = React.lazy(() => import("../../components/common/Footer"));
import { AuthContext } from "../../context/AuthContext";
import { createJob } from "../../services/jobService";

const schema = yup.object().shape({
  jobTitle: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Job title must only contain alphabets")
    .required("Job title is required"),
  location: yup.string().required("Location is required"),
  salary: yup.string().required("Salary is required"),
  jobDescription: yup.string().required("Job description is required"),
  jobRequirements: yup.string().required("Job requirements are required"),
  employmentType: yup.string().required("Employment type is required"),
});

function JobCreation() {
  const { user, loading } = useContext(AuthContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await createJob(data);
      if (response) {
        toast({
          title: "Job posted.",
          description: "Your job has been posted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear the form
        reset();
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
      <Container maxW="container.xl" my="10">
        <Box>
          <Heading size="xl" mb="8" textAlign="left">
            Create new job
          </Heading>
          <VStack
            spacing="6"
            align="start"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={errors.jobTitle}>
              <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
              <Input
                id="jobTitle"
                placeholder="Enter job title"
                {...register("jobTitle")}
              />
              <Text color="red.500">{errors.jobTitle?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.location}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                placeholder="Enter location"
                {...register("location")}
              />
              <Text color="red.500">{errors.location?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.salary}>
              <FormLabel htmlFor="salary">Salary Range</FormLabel>
              <Input
                id="salary"
                placeholder="Enter salary range"
                {...register("salary")}
              />
              <Text color="red.500">{errors.salary?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.jobDescription}>
              <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
              <Textarea
                id="jobDescription"
                placeholder="Enter job description"
                {...register("jobDescription")}
              />
              <Text color="red.500">{errors.jobDescription?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.jobRequirements}>
              <FormLabel htmlFor="jobRequirements">Job Requirements</FormLabel>
              <Textarea
                id="jobRequirements"
                placeholder="Enter job requirements"
                {...register("jobRequirements")}
              />
              <Text color="red.500">{errors.jobRequirements?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.employmentType}>
              <FormLabel htmlFor="employmentType">Employment Type</FormLabel>
              <Select
                id="employmentType"
                placeholder="Select employment type"
                {...register("employmentType")}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Select>
              <Text color="red.500">{errors.employmentType?.message}</Text>
            </FormControl>
            <Button
              colorScheme="blue"
              size="md"
              type="submit"
              alignSelf="end"
              isDisabled={isLoading}
              mb={10}
            >
              {isLoading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </VStack>
        </Box>
      </Container>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <Footer contentType="employer" />
      </React.Suspense>
    </>
  );
}

export default JobCreation;
