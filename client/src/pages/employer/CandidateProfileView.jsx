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
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { FaBriefcase, FaGraduationCap, FaUser } from "react-icons/fa";
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
        <Box className="profile-header">
          <Heading size="2xl" fontWeight="bold" letterSpacing="wide">
            Profile
          </Heading>
          <Text fontSize="lg" mt="4">
            Candidate Information and Details
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 2fr" }}
          gap={6}
          mb="8"
          bg="white"
          p="6"
          borderRadius="lg"
          boxShadow="md"
          borderLeft="6px solid"
          borderColor="blue.500"
        >
          <GridItem>
            <Box textAlign="center">
              <Image
                src={"../../images/profile.webp" || profileData.profilePicture}
                alt="Profile"
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
                mx="auto"
                mb="4"
                boxShadow="md"
              />
              <Heading size="lg">{profileData.name}</Heading>
              <Text fontSize="lg" color="gray.600">
                {profileData.email}
              </Text>
            </Box>
          </GridItem>

          <GridItem my="auto">
            <Box>
              <VStack spacing="4" align="flex-start">
                <Box>
                  <Heading size="md" color="blue.700">
                    Date of Birth
                  </Heading>
                  <Text fontSize="lg">
                    {profileData.dateOfBirth
                      ? new Date(profileData.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : "Not provided"}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md" color="blue.700">
                    Contact
                  </Heading>
                  <Text fontSize="lg">
                    {profileData.contact || "Not provided"}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md" color="blue.700">
                    Address
                  </Heading>
                  <Text fontSize="lg">
                    {profileData.address &&
                    profileData.address.streetName &&
                    profileData.address.city &&
                    profileData.address.postalCode &&
                    profileData.address.country ? (
                      <>
                        {profileData.address.streetName},{" "}
                        {profileData.address.city},{" "}
                        {profileData.address.postalCode},{" "}
                        {profileData.address.country}.
                      </>
                    ) : (
                      "Address is not available"
                    )}
                  </Text>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        <Divider mb="8" />

        <Box mb="8">
          <Heading
            size="lg"
            mb="4"
            color="blue.700"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaUser} w={5} h={5} mr="2" />
            About
          </Heading>
          <Text
            fontSize="lg"
            bg="white"
            p="6"
            borderRadius="lg"
            boxShadow="md"
            borderLeft="6px solid"
            borderColor="blue.500"
          >
            {profileData.about || "Tell us about yourself..."}
          </Text>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4" color="blue.700">
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.experience && profileData.experience.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <Box
                  key={index}
                  p="6"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  borderLeft="6px solid"
                  borderColor="blue.500"
                >
                  <Flex alignItems="center" mb="2">
                    <Icon as={FaBriefcase} w={5} h={5} color="blue.500" />
                    <Text ml="2" fontWeight="bold" fontSize="lg">
                      {exp.jobTitle}
                    </Text>
                  </Flex>
                  <Text fontSize="md">
                    <strong>Company:</strong> {exp.companyName}
                  </Text>
                  <Text fontSize="md">
                    <strong>Duration:</strong> {exp.duration}
                  </Text>
                  <Text fontSize="md">
                    <strong>Description:</strong> {exp.description}
                  </Text>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No experience added yet</Text>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading size="lg" mb="4" color="blue.700">
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <Box
                  key={index}
                  p="6"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  borderLeft="6px solid"
                  borderColor="green.500"
                >
                  <Flex alignItems="center" mb="2">
                    <Icon as={FaGraduationCap} w={5} h={5} color="green.500" />
                    <Text ml="2" fontWeight="bold" fontSize="lg">
                      {edu.degree}
                    </Text>
                  </Flex>
                  <Text fontSize="md">
                    <strong>Institution:</strong> {edu.institutionName}
                  </Text>
                  <Text fontSize="md">
                    <strong>Years Attended:</strong> {edu.yearsAttended}
                  </Text>
                  <Text fontSize="md">
                    <strong>Description:</strong> {edu.description}
                  </Text>
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
