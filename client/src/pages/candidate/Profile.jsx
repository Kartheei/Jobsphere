import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Input,
  Textarea,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Spinner,
  Stack,
  Tag,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CloudUpload } from "lucide-react";

import { DragAndDropUpload } from "../../components/candidate/DragandDropUpload";
import NavBar from "../../components/candidate/NavBar";
import Footer from "../../components/common/Footer";
import { AuthContext } from "../../context/AuthContext";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchCandidateResume,
} from "../../services/userService";
import "../../assets/styles/style.css";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    about: "",
    experience: [],
    education: [],
    address: {
      streetName: "",
      city: "",
      postalCode: "",
      country: "",
    },
    contact: "",
    dateOfBirth: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null); // Added state for resume file
  const toast = useToast();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfileData({
          ...data,
          experience: data.experience || [],
          education: data.education || [],
          address: data.address || {
            streetName: "",
            city: "",
            postalCode: "",
            country: "",
          },
          contact: data.contact || "",
          dateOfBirth: data.dateOfBirth || "",
        });
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
    getUserProfile();
  }, [toast]);

  const handleEditToggle = async () => {
    if (editMode) {
      await updateProfile();
      await refreshProfileData();
    }
    setEditMode(!editMode);
  };

  const refreshProfileData = async () => {
    try {
      const data = await fetchUserProfile();
      setProfileData({
        ...data,
        experience: data.experience || [],
        education: data.education || [],
      });
    } catch (error) {
      toast({
        title: "Error fetching profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateProfile = async () => {
    const nonEmptyExperience = profileData.experience.filter(
      (exp) =>
        exp.jobTitle &&
        exp.companyName &&
        exp.durationFrom &&
        exp.durationTo &&
        exp.description
    );

    const nonEmptyEducation = profileData.education.filter(
      (edu) =>
        edu.degree &&
        edu.institutionName &&
        edu.yearsAttendedFrom &&
        edu.yearsAttendedTo &&
        edu.description
    );

    try {
      await updateUserProfile({
        name: profileData.name,
        email: profileData.email,
        about: profileData.about,
        experiences: nonEmptyExperience,
        education: nonEmptyEducation,
        address: profileData.address,
        contact: profileData.contact,
        dateOfBirth: profileData.dateOfBirth,
      });
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = [...profileData.experience];
    newExperience[index][name] = value;
    setProfileData({
      ...profileData,
      experience: newExperience,
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...profileData.education];
    newEducation[index][name] = value;
    setProfileData({
      ...profileData,
      education: newEducation,
    });
  };

  const handleAddressChange = (e, field) => {
    const value = e.target.value;
    setProfileData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
  };

  const addNewExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          jobTitle: "",
          companyName: "",
          durationFrom: "",
          durationTo: "",
          description: "",
        },
      ],
    }));
  };

  const addNewEducation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          degree: "",
          institutionName: "",
          yearsAttendedFrom: "",
          yearsAttendedTo: "",
          description: "",
        },
      ],
    }));
  };

  const handleCancel = () => {
    setEditMode(false);
    refreshProfileData(); // Revert profile data to original state before editing
  };

  const handleViewResume = () => {
    window.open("http://localhost:5000/api/users/getResume", "_blank");
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const downloadResume = async () => {
    try {
      const data = await fetchCandidateResume();
      console.log("Resume data", data);
    } catch (error) {
      toast({
        title: "Error fetching resume.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <Flex align="center" direction="column" mb="8">
          <Image
            src={profileData.profilePicture || "./images/profile.webp"}
            alt="Profile"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            mb="4"
            boxShadow="md"
          />
          <Text fontSize="2xl" fontWeight="bold">
            {profileData.name}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {profileData.email}
          </Text>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={6} mb="8">
          <GridItem>
            <Box bg="gray.50" p="6" borderRadius="lg" boxShadow="md">
              <VStack spacing="4" align="flex-start">
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="bold">
                    Date of Birth
                  </FormLabel>
                  {editMode ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={handleChange}
                      size="lg"
                    />
                  ) : (
                    <Text fontSize="lg">
                      {profileData.dateOfBirth
                        ? new Date(profileData.dateOfBirth)
                            .toISOString()
                            .split("T")[0]
                        : "Enter your date of birth..."}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="bold">
                    Contact
                  </FormLabel>
                  {editMode ? (
                    <Input
                      id="contact"
                      placeholder="+1 123 123 1234"
                      value={profileData.contact}
                      onChange={handleChange}
                      size="lg"
                    />
                  ) : (
                    <Text fontSize="lg">
                      {profileData.contact || "Enter your contact..."}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="bold">
                    Address
                  </FormLabel>
                  {editMode ? (
                    <>
                      <Input
                        id="streetName"
                        placeholder="Street"
                        value={profileData.address.streetName}
                        onChange={(e) => handleAddressChange(e, "streetName")}
                        size="lg"
                        mb="2"
                      />
                      <Input
                        id="city"
                        placeholder="City"
                        value={profileData.address.city}
                        onChange={(e) => handleAddressChange(e, "city")}
                        size="lg"
                        mb="2"
                      />
                      <Input
                        id="postalCode"
                        placeholder="Postal Code"
                        value={profileData.address.postalCode}
                        onChange={(e) => handleAddressChange(e, "postalCode")}
                        size="lg"
                        mb="2"
                      />
                      <Input
                        id="country"
                        placeholder="Country"
                        value={profileData.address.country}
                        onChange={(e) => handleAddressChange(e, "country")}
                        size="lg"
                        mb="2"
                      />
                    </>
                  ) : (
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
                        "Provide your address."
                      )}
                    </Text>
                  )}
                </FormControl>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              bg="gray.50"
              p="6"
              borderRadius="lg"
              boxShadow="md"
              height="100%"
            >
              <Flex
                onClick={downloadResume}
                cursor="pointer"
                align="center"
                justify="center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 13v8" />
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="m8 17 4-4 4 4" />
                </svg>
              </Flex>
              <Text fontSize="sm" mt="2" textAlign="center">
                Download Resume
              </Text>
              <Box mt="4" width="100%">
                <DragAndDropUpload />
              </Box>
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
            About
          </Heading>
          {editMode ? (
            <Textarea
              id="about"
              value={profileData.about}
              onChange={handleChange}
              size="lg"
            />
          ) : (
            <Text fontSize="lg">
              {profileData.about || "Tell us about yourself..."}
            </Text>
          )}
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading
            size="lg"
            mb="4"
            color="blue.700"
            display="flex"
            alignItems="center"
          >
            Experience
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.experience && profileData.experience.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <Box
                  key={index}
                  p="4"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <FormControl>
                    <FormLabel fontWeight="bold">Job Title</FormLabel>
                    {editMode ? (
                      <Input
                        name="jobTitle"
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.jobTitle}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Company Name</FormLabel>
                    {editMode ? (
                      <Input
                        name="companyName"
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.companyName}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Duration</FormLabel>
                    {editMode ? (
                      <>
                        <Input
                          name="durationFrom"
                          type="month"
                          value={exp.durationFrom}
                          onChange={(e) => handleExperienceChange(e, index)}
                        />
                        <Input
                          name="durationTo"
                          type="month"
                          value={exp.durationTo}
                          onChange={(e) => handleExperienceChange(e, index)}
                        />
                      </>
                    ) : (
                      <Text>
                        From{" "}
                        {new Date(exp.durationFrom).toISOString().split("T")[0]}{" "}
                        To{" "}
                        {new Date(exp.durationTo).toISOString().split("T")[0]}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Description</FormLabel>
                    {editMode ? (
                      <Textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    ) : (
                      <Text>{exp.description}</Text>
                    )}
                  </FormControl>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No experience added yet</Text>
            )}
            {editMode && (
              <Button
                colorScheme="blue"
                variant="outline"
                alignSelf="flex-start"
                onClick={addNewExperience}
              >
                Add Experience
              </Button>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Box mb="8">
          <Heading
            size="lg"
            mb="4"
            color="blue.700"
            display="flex"
            alignItems="center"
          >
            Education
          </Heading>
          <VStack spacing="4" align="stretch">
            {profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <Box
                  key={index}
                  p="4"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <FormControl>
                    <FormLabel fontWeight="bold">Degree</FormLabel>
                    {editMode ? (
                      <Input
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.degree}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Institution Name</FormLabel>
                    {editMode ? (
                      <Input
                        name="institutionName"
                        value={edu.institutionName}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.institutionName}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Years Attended</FormLabel>
                    {editMode ? (
                      <>
                        <Input
                          name="yearsAttendedFrom"
                          type="month"
                          value={edu.yearsAttendedFrom}
                          onChange={(e) => handleEducationChange(e, index)}
                        />
                        <Input
                          name="yearsAttendedTo"
                          type="month"
                          value={edu.yearsAttendedTo}
                          onChange={(e) => handleEducationChange(e, index)}
                        />
                      </>
                    ) : (
                      <Text>
                        <Text>
                          From{" "}
                          {
                            new Date(edu.yearsAttendedFrom)
                              .toISOString()
                              .split("T")[0]
                          }{" "}
                          To{" "}
                          {
                            new Date(edu.yearsAttendedTo)
                              .toISOString()
                              .split("T")[0]
                          }
                        </Text>
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Description</FormLabel>
                    {editMode ? (
                      <Textarea
                        name="description"
                        value={edu.description}
                        onChange={(e) => handleEducationChange(e, index)}
                      />
                    ) : (
                      <Text>{edu.description}</Text>
                    )}
                  </FormControl>
                </Box>
              ))
            ) : (
              <Text fontSize="lg">No education added yet</Text>
            )}
            {editMode && (
              <Button
                colorScheme="blue"
                variant="outline"
                alignSelf="flex-start"
                onClick={addNewEducation}
              >
                Add Education
              </Button>
            )}
          </VStack>
        </Box>

        <Divider mb="8" />

        <Box display="flex" justifyContent="flex-end" gap="2">
          <Button onClick={handleEditToggle} colorScheme="blue">
            {editMode ? "Save" : "Edit"}
          </Button>

          {editMode && (
            <Button onClick={handleCancel} colorScheme="red">
              Cancel
            </Button>
          )}
        </Box>
      </Container>
      <Footer contentType="candidate" />
    </>
  );
}

export default Profile;
