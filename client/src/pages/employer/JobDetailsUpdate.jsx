import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import { fetchJobDetails, updateJobDetails } from "../../services/jobService";

const schema = yup.object().shape({
  jobTitle: yup.string()
  .matches(/^[A-Za-z\s]+$/, "Job title must only contain alphabets")
  .required("Job title is required"),
  location: yup.string().required("Location is required"),
  salary: yup.string().required("Salary is required"),
  jobDescription: yup.string().required("Job description is required"),
  jobRequirements: yup.string().required("Job requirements are required"),
  employmentType: yup.string().required("Employment type is required"),
});

const JobDetailsUpdate = () => {
  const { id } = useParams();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const data = await fetchJobDetails(id);
        setValue("jobTitle", data.title);
        setValue("location", data.location);
        setValue("salary", data.salary);
        setValue("jobDescription", data.description);
        setValue("jobRequirements", data.requirements);
        setValue("employmentType", data.job_type);
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
  }, [id, toast, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateJobDetails(id, {
        title: data.jobTitle,
        location: data.location,
        salary: data.salary,
        description: data.jobDescription,
        requirements: data.jobRequirements,
        job_type: data.employmentType,
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
          <VStack
            spacing="6"
            align="start"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl id="jobTitle" isInvalid={errors.jobTitle}>
              <FormLabel>Job Title</FormLabel>
              <Input
                name="jobTitle"
                placeholder="Enter job title"
                {...register("jobTitle")}
              />
              <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="location" isInvalid={errors.location}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                placeholder="Enter location"
                {...register("location")}
              />
              <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="salary" isInvalid={errors.salary}>
              <FormLabel>Salary Range</FormLabel>
              <Input
                name="salary"
                placeholder="Enter salary range"
                {...register("salary")}
              />
              <FormErrorMessage>{errors.salary?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="jobDescription" isInvalid={errors.jobDescription}>
              <FormLabel>Job Description</FormLabel>
              <Textarea
                name="jobDescription"
                placeholder="Enter job description"
                {...register("jobDescription")}
              />
              <FormErrorMessage>{errors.jobDescription?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="jobRequirements"
              isInvalid={errors.jobRequirements}
            >
              <FormLabel>Job Requirements</FormLabel>
              <Textarea
                name="jobRequirements"
                placeholder="Enter job requirements"
                {...register("jobRequirements")}
              />
              <FormErrorMessage>
                {errors.jobRequirements?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="employmentType"
              isInvalid={errors.employmentType}
            >
              <FormLabel>Employment Type</FormLabel>
              <Select
                name="employmentType"
                {...register("employmentType")}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Select>
              <FormErrorMessage>
                {errors.employmentType?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              alignSelf="end"
              type="submit"
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
