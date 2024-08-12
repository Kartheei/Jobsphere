import React, { useState, useEffect } from "react";

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
  Image,
  SimpleGrid,
  Input,
  Textarea,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import Footer from "../../components/common/Footer";
import NavBar from "../../components/employer/NavBar";
import "../../assets/styles/Employerprofile.css";
import {
  fetchEmployerProfileData,
  updateEmployerProfile,
} from "../../services/employerService";

const EmployerProfile = () => {
  const [editMode, setEditMode] = useState({
    details: false,
    about: false,
    insights: false,
  });

  const [profileData, setProfileData] = useState({
    organizationName: "",
    website: "",
    industry: "",
    location: "",
    about: "",
    totalEmployees: "",
    globalOffices: "",
    yearFounded: "",
  });

  const toast = useToast();

  useEffect(() => {
    const getEmployerProfile = async () => {
      try {
        const data = await fetchEmployerProfileData();
        const { name, email, organizationName, ...companyDetails } = data;
        setProfileData({
          organizationName: organizationName || "Company Name",
          website: companyDetails.website || "Website",
          industry: companyDetails.industry || "Industry",
          location: companyDetails.location || "Location",
          about: companyDetails.aboutCompany || "",
          totalEmployees: companyDetails.insights?.totalEmployees || "",
          globalOffices: companyDetails.insights?.globalOffices || "",
          yearFounded: companyDetails.insights?.yearFounded || "",
        });
      } catch (error) {
        toast({
          title: "Error fetching profile data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    getEmployerProfile();
  }, [toast]);

  const handleEditToggle = (section) => {
    setEditMode((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleChange = (e, field) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = async (section) => {
    try {
      let updatedData = {};
      switch (section) {
        case "details":
          updatedData = {
            organizationName: profileData.organizationName,
            website: profileData.website,
            industry: profileData.industry,
            location: profileData.location,
          };
          break;
        case "about":
          updatedData = { aboutCompany: profileData.about };
          break;
        case "insights":
          updatedData = {
            insights: {
              totalEmployees: profileData.totalEmployees,
              globalOffices: profileData.globalOffices,
              yearFounded: profileData.yearFounded,
            },
          };
          break;
        default:
          console.error("Invalid section");
          return;
      }

      const updatedProfileData = await updateEmployerProfile(updatedData);
      setProfileData((prevData) => ({ ...prevData, ...updatedProfileData }));
      setEditMode((prevState) => ({ ...prevState, [section]: false }));
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <NavBar />
      <Box className="cover-image" mb="4" textAlign="center" bg="gray.100">
        <Image
          src="/images/registration.jpg"
          alt="Cover"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Container maxW="container.xl" mt="8">
        <Flex alignItems="center" mb="8">
          <Box className="profile-picture" mr="4">
            <Image
              src="/images/profile.png"
              alt="Profile"
              borderRadius="full"
              boxSize="150px"
            />
          </Box>
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="start"
              flexDirection="column"
            >
              <Box>
                {editMode.details ? (
                  <>
                    <Input
                      value={profileData.organizationName}
                      onChange={(e) => handleChange(e, "organizationName")}
                      size="lg"
                      mb="2"
                    />
                    <Input
                      value={profileData.website}
                      onChange={(e) => handleChange(e, "website")}
                      size="md"
                      mb="2"
                    />
                    <Input
                      value={profileData.industry}
                      onChange={(e) => handleChange(e, "industry")}
                      size="md"
                      mb="2"
                    />
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleChange(e, "location")}
                      size="md"
                      mb="4"
                    />
                  </>
                ) : (
                  <>
                    <Heading as="h2" size="lg" mb="2">
                      {profileData.organizationName}
                    </Heading>
                    <Text fontSize="md" color="gray.500" mb="2">
                      {profileData.website} | {profileData.industry} |{" "}
                      {profileData.location}
                    </Text>
                  </>
                )}
              </Box>
            </Flex>
            <Box>
              <Badge colorScheme="green" mr="2">
                Featured
              </Badge>
              <Badge colorScheme="purple">Verified</Badge>
            </Box>
            <Button
              size="sm"
              mt="4"
              colorScheme="blue"
              onClick={() =>
                editMode.details
                  ? handleSave("details")
                  : handleEditToggle("details")
              }
            >
              {editMode.details ? "Save" : "Edit"}
            </Button>
          </Box>
        </Flex>
        <Box mb="8">
          <Flex flexDirection="column">
            <Heading size="md" mb="4">
              About Company
            </Heading>
          </Flex>
          {editMode.about ? (
            <Textarea
              value={profileData.about}
              onChange={(e) => handleChange(e, "about")}
              size="lg"
            />
          ) : (
            <Text>{profileData.about}</Text>
          )}
          <Button
            size="sm"
            mt="4"
            colorScheme="blue"
            onClick={() =>
              editMode.about ? handleSave("about") : handleEditToggle("about")
            }
          >
            {editMode.about ? "Save" : "Edit"}
          </Button>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            className="insight-card"
            p="4"
            borderWidth="1px"
            borderRadius="md"
          >
            <Flex flexDirection="column" gap="1">
              <Heading as="h4" size="md" mb="2">
                Company Insights
              </Heading>
              {editMode.insights ? (
                <>
                  <Input
                    value={profileData.totalEmployees}
                    onChange={(e) => handleChange(e, "totalEmployees")}
                    size="md"
                    mb="2"
                  />
                  <Input
                    value={profileData.globalOffices}
                    onChange={(e) => handleChange(e, "globalOffices")}
                    size="md"
                    mb="2"
                  />
                  <Input
                    value={profileData.yearFounded}
                    onChange={(e) => handleChange(e, "yearFounded")}
                    size="md"
                    mb="2"
                  />
                </>
              ) : (
                <>
                  <Text>Total Employees: {profileData.totalEmployees}</Text>
                  <Text>Global Offices: {profileData.globalOffices}</Text>
                  <Text>Year Founded: {profileData.yearFounded}</Text>
                </>
              )}
            </Flex>
            <Button
              size="sm"
              mt="4"
              colorScheme="blue"
              onClick={() =>
                editMode.insights
                  ? handleSave("insights")
                  : handleEditToggle("insights")
              }
            >
              {editMode.insights ? "Save" : "Edit"}
            </Button>
          </Box>
          <Box
            className="testimonial-card"
            p="4"
            borderWidth="1px"
            borderRadius="md"
          >
            <Heading as="h4" size="md" mb="2">
              Employee Testimonials
            </Heading>
            <Text>
              &quot;XYZ Company is an amazing place to work with endless
              opportunities for growth.&quot;
            </Text>
            <Text>- John Doe</Text>
            <Text>
              &quot;Supportive environment and great work-life balance.&quot;
            </Text>
            <Text>- Jane Smith</Text>
          </Box>
        </SimpleGrid>
      </Container>

      <Footer contentType="employer" />
    </ChakraProvider>
  );
};

export default EmployerProfile;
