import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Divider,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import { fetchCandidateProfile } from "../../services/userService";

const CandidateProfileView = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await fetchCandidateProfile(userId);
        setProfileData(data);
      } catch (error) {
        toast({
          title: "Error fetching profile.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getProfileData();
  }, [userId, toast]);

  if (isLoading) {
    return (
      <div className="app-spinner">
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  if (!profileData) {
    return (
      <>
        <NavBar />
        <Container maxW="container.xl" mt="8">
          <Text fontSize="xl" color="red.500">
            Profile not found.
          </Text>
        </Container>
        <Footer contentType="employer" />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt="8">
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

        <Box mr="6" mb="8">
          <Image
            src={profileData.profilePicture || "./images/profile.png"}
            alt="Profile"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
          />
        </Box>

        <Flex alignItems="center" mb="8" bg="gray.50" p="6" borderRadius="md">
          <VStack spacing="4" align="flex-start" flex="1">
            <Box>
              <Heading size="md">Name</Heading>
              <Text>{profileData.name}</Text>
            </Box>

            <Box>
              <Heading size="md">Email</Heading>
              <Text>{profileData.email}</Text>
            </Box>
          </VStack>
        </Flex>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            About
          </Heading>
          <Text fontSize="lg">
            {profileData.about || "Tell us about yourself..."}
          </Text>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.experience && profileData.experience.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <Box key={index} p="4" bg="gray.100" borderRadius="md">
                  <Text fontWeight="bold">Job Title: {exp.jobTitle}</Text>
                  <Text>Company Name: {exp.companyName}</Text>
                  <Text>Duration: {exp.duration}</Text>
                  <Text>Description: {exp.description}</Text>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No experience added yet</Text>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4">
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <Box key={index} p="4" bg="gray.100" borderRadius="md">
                  <Text fontWeight="bold">Degree: {edu.degree}</Text>
                  <Text>Institution Name: {edu.institutionName}</Text>
                  <Text>Years Attended: {edu.yearsAttended}</Text>
                  <Text>Description: {edu.description}</Text>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No education added yet</Text>
            )}
          </VStack>
        </Box>
      </Container>
      <Footer contentType="employer" />
    </>
  );
};

export default CandidateProfileView;
